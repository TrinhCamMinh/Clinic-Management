import { FaInfoCircle } from 'react-icons/fa';
import { MdError } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";

import { getCurrentDate, formatCurrency } from '../utils/General';
import { SweetAlert } from '../utils/Alert'
import { useState, useEffect, useRef, useMemo } from 'react';
import { useDebounce } from '../hooks/index';
import { AgGridReact } from 'ag-grid-react'; //* React Grid Logic
import { collection, query, where, getDocs, getDoc, doc } from 'firebase/firestore';
import { db } from '../Configs/firebase';
import { useTheme } from '../hooks/index'
import { Link } from 'react-router-dom';

const MedicalCertificate = () => {
    const themeValue = useTheme();
    const bonusMedicineRef = useRef()
    const [queryByIllnessName, setQueryByIllnessName] = useState('');
    const [symptom, setSymptom] = useState('');

    const [bonusMedicineList, setBonusMedicineList] = useState([]) //* Render full list of Medicine from Firebase in Bonus Medicine Form
    const [medicines, setMedicines] = useState([]); //* Contain each medicine object after query them from reference in Symptoms Collection

    const [queryUserInfo, setQueryUserInfo] = useState('');
    const [userData, setUserData] = useState('');

    //* This state store error message and display when User or Prescription Info not found
    const [errorMessage, setErrorMessage] = useState({})

    //* If there is no document at the location referenced by docRef,
    //* the resulting document will be empty and calling exists on it
    //* will return false.
    const getMedicineFromReference = async (reference) => {
        const docRef = doc(db, reference.path);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            // docSnap.data() will be undefined in this case
            console.log('No such document!');
            return;
        }

        const medicine = docSnap.data();

        // Result: an Array of Object
        setMedicines((prevData) => [...prevData, medicine]);
    };

    //* Gab prescription detail information from FireStore
    const receivePrescriptionData = async () => {
        if(!queryByIllnessName) {
            setSymptom('');
            setErrorMessage(prevData => ({...prevData, queryPrescription: ''}))
            return ;   
        }
        try {
            const symptomsRef = collection(db, 'Symptoms');
            // Create a query against the collection.
            // Transform both name in FireStore and User typed to lowercase so that they don't
            // have to type exactly the name with some Uppercase character
            const q = query(symptomsRef, where('name', '==', queryByIllnessName.toLowerCase()));
            // After creating a query object, use the get() function to retrieve the results
            const querySnapshot = await getDocs(q);

            //* Not Found Case
            if (querySnapshot.size === 0) {
                setSymptom('');
                setErrorMessage(prevData => ({
                    ...prevData,
                    queryPrescription: 'Không tìm thấy dữ liệu đơn thuốc của triệu chứng bệnh tương ứng'
                }));
                return;
            }
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                setSymptom(doc.data());
            });

            SweetAlert.Toast.Success({title: 'Tìm kiếm thông tin đơn thuốc thành công'})
            setErrorMessage(prevData => ({...prevData, queryPrescription: ''}))
        } catch (error) {
            SweetAlert.Message.Error({title: 'Đã xảy ra lỗi', text: 'Không thể tìm thấy thông tin đơn thuốc tương ứng'})
            setErrorMessage(prevData => ({
                ...prevData,
                queryPrescription: error.message
            }));
        }
    };

    //* Gab user detail information from FireStore
    const receiveUserData = async () => {
        if(!queryUserInfo) {
            setUserData('');
            setErrorMessage(prevData => ({...prevData, queryUser: ''}))
            return ;
        }
        try {
            //* Convert the query user type to Number Data Type
            //* Ex: '0907722143' --> 907722143
            const queryPhoneNumber = Number(queryUserInfo);

            const patientsRef = collection(db, 'Patients');
            // Create a query against the collection.
            const q = query(patientsRef, where('phoneNumber', '==', queryPhoneNumber));

            // After creating a query object, use the get() function to retrieve the results
            const querySnapshot = await getDocs(q);

            //* Not Found Case
            if (querySnapshot.size === 0) {
                setUserData('');
                setErrorMessage(prevData => ({...prevData, queryUser: 'Không tìm thấy thông tin bệnh nhân'}))
                return;
            }

            querySnapshot.forEach((doc) => {
                //* doc.data() is never undefined for query doc snapshots
                setUserData(doc.data());
            });
            SweetAlert.Toast.Success({title: 'Tìm kiếm thông tin bệnh nhân thành công'})
            setErrorMessage(prevData => ({...prevData, queryUser: ''}))
        } catch (error) {
            setErrorMessage(prevData => ({...prevData, queryUser: error.message}))
        }
    };

    const getMedicineList = async () => {
        const querySnapshot = await getDocs(collection(db, 'Medicines'));
        querySnapshot.forEach((doc) => {
            const medicine = doc.data();
            medicine.cost = formatCurrency(Number(medicine.cost)); // Format the currency property in VND format
            medicine.ref = doc.ref; //* Attach the ref property to object pass it as reference datatype to FireStore
            setBonusMedicineList((prevData) => [...prevData, medicine]);
        });
    };

    const checkboxSelection = function (params) {
        //* we put checkbox on the name if we are not doing grouping
        return params.api.getRowGroupColumns().length === 0;
    };

    const headerCheckboxSelection = function (params) {
        //* we put checkbox on the name if we are not doing grouping
        return params.api.getRowGroupColumns().length === 0;
    };

    //* Column Definitions: Defines & controls grid columns.
    const [colDefs, setColDefs] = useState([
        {
            headerName: 'Tên thuốc',
            field: 'name',
            wrapText: true,
            autoHeight: true,
            filter: true,
        },
        { headerName: 'Triệu chứng', field: 'symptom', wrapText: true, filter: true },
        {
            headerName: 'Giá', 
            valueGetter: params => {
                if(typeof params.data.cost === 'string') return params.data.cost
                return formatCurrency(params.data.cost);
            },
            filter: true
        },
        { headerName: 'Liều lượng sử dụng', field: 'usage', wrapText: true, filter: true },
        { headerName: 'Thành phần dược', field: 'ingredient', wrapText: true, filter: true },
    ]);

    //* Column Definitions: Defines & controls grid columns.
    const [colDefsBonusMedicineList, setColDefsbonusMedicineList] = useState([
        {
            headerName: 'Tên thuốc',
            width: 350,
            field: 'name',
            autoHeight: true,
            pinned: 'left',
            filter: true,
            checkboxSelection: checkboxSelection,
            headerCheckboxSelection: headerCheckboxSelection,
        },
        { headerName: 'Triệu chứng', width: 350, field: 'symptom', filter: true },
        { headerName: 'Giá', field: 'cost', filter: true },
        { headerName: 'Liều lượng sử dụng', field: 'usage', filter: true },
        { headerName: 'Thành phần dược', field: 'ingredient', filter: true },
        { headerName: 'Số lượng tồn kho', field: 'existNumber', filter: true },
    ]);

    const autoSizeStrategy = useMemo(() => {
    return {
        type: 'fitGridWidth',
    };
    }, []);

    useDebounce(receivePrescriptionData, [queryByIllnessName], 1000);
    useDebounce(receiveUserData, [queryUserInfo], 1000);

    const handleBonusMedicineSaveButtonClicked = () => {
        const modal = document.getElementById('bonus_medicine_modal')
        const selectedRow = bonusMedicineRef.current.api.getSelectedRows();
        setMedicines(prevData => [
            ...prevData,
            ...selectedRow
        ])
        modal.close()
    }

    //* Display Medicine List Table from FireStore whenever the symptom name changed (applied debounce)
    useEffect(() => {
        setMedicines([]);
        const { prescriptions } = symptom;
        if (!prescriptions) return;
        prescriptions.forEach((item) => {
            getMedicineFromReference(item);
        });
    }, [symptom]);

    useEffect(() => {
        getMedicineList()
    }, [])

    return (
        <>
            <div>
                <section className='grid grid-cols-4 gap-4'>
                    <label className='form-control col-span-4 xl:col-span-2'>
                        <div className='label'>
                            <span className='label-text'>Tên người khám</span>
                        </div>
                        <input
                            defaultValue={userData.name}
                            type='text'
                            placeholder='VD: Nguyễn Văn A'
                            className='input input-bordered w-full'
                            disabled
                        />
                    </label>
                    <label className='form-control col-span-4 xl:col-span-2'>
                        <div className='label'>
                            <span className='label-text'>Khách hàng mới</span>
                        </div>
                        <input type='text' defaultValue={'Có'} placeholder='VD: Có' className='input input-bordered w-full' disabled />
                    </label>
                    <label className='form-control col-span-4 xl:col-span-1'>
                        <div className='label'>
                            <span className='label-text'>Số điện thoại người khám</span>
                            <div
                                className='tooltip tooltip-info tooltip-left xl:tooltip-top'
                                data-tip='Hệ thống tự động load thông tin bệnh nhân tương ứng khi nhập đúng số điện thoại người khám'
                            >
                                <FaInfoCircle className='w-4 h-4 text-sky-600 ' />
                            </div>
                        </div>
                        <input
                            type='text'
                            placeholder='Vui lòng nhập SDT người khám'
                            className='input input-bordered w-full'
                            onChange={(e) => setQueryUserInfo(e.target.value)}
                        />
                        {errorMessage.queryUser && 
                            <div role="alert" className="alert shadow-lg mt-2">
                                <MdError className='inline w-5 h-5 text-error'/>
                                <div>
                                    <h3 className="font-bold text-error">{ errorMessage.queryUser }!</h3>
                                    <Link to={'/masterdata/patient'}>
                                        <div className="text-xs text-info underline underline-offset-8 italic">Nhấn vào đây để tạo mới dữ liệu cho bệnh nhân tương ứng</div>
                                    </Link>
                                </div>
                            </div>
                        }
                    </label>
                    <label className='form-control col-span-4 xl:col-span-1'>
                        <div className='label'>
                            <span className='label-text'>Tuổi người khám</span>
                        </div>
                        <input
                            defaultValue={userData.age}
                            type='number'
                            placeholder='VD: 8'
                            className='input input-bordered w-full'
                            disabled
                        />
                    </label>
                    <label className='form-control col-span-4 xl:col-span-1'>
                        <div className='label'>
                            <span className='label-text'>Mã số khám</span>
                        </div>
                        <input
                            disabled
                            type='text'
                            defaultValue={userData.medicalCode}
                            placeholder='VD: 520H0659'
                            className='input input-bordered w-full'
                        />
                    </label>
                    <label className='form-control col-span-4 xl:col-span-1'>
                        <div className='label'>
                            <span className='label-text'>Mã phiếu khám</span>
                        </div>
                        <input type='text' placeholder='VD: 520H0659' className='input input-bordered w-full' disabled />
                    </label>
                    <label className='form-control col-span-4 xl:col-span-1'>
                        <div className='label'>
                            <span className='label-text'>Ngày khám</span>
                        </div>
                        <input
                            defaultValue={getCurrentDate({}, 'en-CA')}
                            type='date'
                            className='input input-bordered w-full'
                            disabled
                        />
                    </label>
                    <label className='form-control col-span-4 xl:col-span-1'>
                        <div className='label'>
                            <span className='label-text'>Ngày tái khám</span>
                        </div>
                        <input
                            type='date'
                            placeholder='vui lòng nhập ngày tái khám'
                            className='input input-bordered w-full'
                        />
                    </label>
                    <label className='form-control col-span-4 xl:col-span-2'>
                        <div className='label'>
                            <span className='label-text'>Tên triệu chứng</span>
                            <div
                                className='tooltip tooltip-info tooltip-left'
                                data-tip='Hệ thống tự động load thông tin đơn thuốc tương ứng khi nhập đúng tên triệu chứng bệnh'
                            >
                                <FaInfoCircle className='w-4 h-4 text-sky-600 ' />
                            </div>
                        </div>
                        <input
                            type='text'
                            placeholder='Vui lòng nhập tên triệu chứng'
                            className='input input-bordered w-full'
                            onChange={(e) => setQueryByIllnessName(e.target.value)}
                        />
                    </label>
                    <label className='form-control col-span-4'>
                        <div className='label'>
                            <span className='label-text'>Mô tả triệu chứng</span>
                        </div>
                        <input
                            disabled
                            type='text'
                            defaultValue={symptom.description}
                            placeholder='VD: mệt mỏi, đau nhức toàn thân'
                            className='input input-bordered w-full'
                        />
                        {
                            errorMessage.queryPrescription && 
                            <div role="alert" className="alert shadow-lg mt-2">
                                <MdError className='inline w-5 h-5 text-error'/>
                                <div>
                                    <h3 className="font-bold text-error">{ errorMessage.queryPrescription }!</h3>
                                    <Link to={'/masterdata/disease'}>
                                        <div className="text-xs text-info underline underline-offset-8 italic">Nhấn vào đây để tạo mới dữ liệu cho triệu chứng tương ứng</div>
                                    </Link>
                                </div>
                            </div>
                        }
                    </label>
                </section>

                <section className='w-full mt-8'>
                    <div>
                        {medicines.length > 0 && (
                            <div className={`col-span-3`} style={{ width: '100%' }}>
                                <header>
                                    <h2 className='capitalize text-4xl font-bold text-primary text-center'>
                                        thông tin đơn thuốc
                                    </h2>
                                </header>

                                <button
                                    className="btn btn-outline btn-info w-fit tooltip" data-tip="Dữ liệu sẽ không được lưu vào hệ thống"
                                    onClick={()=>document.getElementById('bonus_medicine_modal').showModal()}
                                >
                                    <CiCirclePlus className='inline w-5 h-5 mr-2'/>
                                    Nhấn vào đây để thêm dược liệu cho đơn thuốc
                                </button>

                                <div className={`overflow-x-auto mt-4 mb-2 ${themeValue === 'dark' ? 'ag-theme-quartz-dark' : 'ag-theme-quartz'}`} style={{ height: 500 }}>
                                    {/* The AG Grid component */}
                                    <AgGridReact
                                        rowData={medicines}
                                        columnDefs={colDefs}
                                        rowSelection={'multiple'}
                                        rowGroupPanelShow={'always'}
                                        autoSizeStrategy={autoSizeStrategy}
                                        pagination={true}
                                        paginationPageSize={20}
                                        paginationPageSizeSelector={[20, 50, 100]}
                                        suppressScrollOnNewData={true} //* tells the grid to NOT scroll to the top when the page changes
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </div>

            <dialog id="bonus_medicine_modal" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div className={`col-span-3`} style={{ width: '100%' }}>
                        <header>
                            <h2 className='capitalize text-4xl font-bold text-primary text-center'>
                                danh sách đơn thuốc
                            </h2>
                        </header>
                        <div className={`overflow-x-auto mt-8 mb-2 ${themeValue === 'dark' ? 'ag-theme-quartz-dark' : 'ag-theme-quartz'}`} style={{ height: 500 }}>
                            {/* The AG Grid component */}
                            <AgGridReact
                                ref={bonusMedicineRef}
                                rowData={bonusMedicineList}
                                columnDefs={colDefsBonusMedicineList}
                                rowSelection={'multiple'}
                                rowGroupPanelShow={'always'}
                                autoSizeStrategy={autoSizeStrategy}
                                pagination={true}
                                paginationPageSize={20}
                                paginationPageSizeSelector={[20, 50, 100]}
                                suppressScrollOnNewData={true} //* tells the grid to NOT scroll to the top when the page changes
                            />
                        </div>
                        <div className='mt-2'>
                            <button className="btn btn-success btn-block" onClick={handleBonusMedicineSaveButtonClicked}>
                                Lưu dữ liệu
                            </button>
                        </div>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default MedicalCertificate;
