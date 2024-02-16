import { FaInfoCircle } from 'react-icons/fa';

import { getCurrentDate, formatCurrency } from '../utils/General';
import { SweetAlert } from '../utils/Alert'
import { useState, useEffect } from 'react';
import { useDebounce } from '../hooks/index';
import { AgGridReact } from 'ag-grid-react'; //* React Grid Logic
import { collection, query, where, getDocs, getDoc, doc } from 'firebase/firestore';
import { db } from '../Configs/firebase';
import { useTheme } from '../hooks/index'

const MedicalCertificate = () => {
    const themeValue = useTheme();
    const [queryByIllnessName, setQueryByIllnessName] = useState('');
    const [prescriptionData, setPrescriptionData] = useState(null); //! Consider Remove
    const [symptom, setSymptom] = useState('');
    const [medicines, setMedicines] = useState([]); //* Contain each medicine object after query them from reference in Symptoms Collection

    const [queryUserInfo, setQueryUserInfo] = useState('');
    const [userData, setUserData] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);

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
                SweetAlert.Toast.Error({title: 'Không tìm thấy thông tin đơn thuốc tương ứng'});
                return;
            }
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                setSymptom(doc.data());
            });

            SweetAlert.Toast.Success({title: 'Tìm kiếm thông tin đơn thuốc thành công'})
        } catch (error) {
            SweetAlert.Message.Error({title: 'Đã xảy ra lỗi', text: 'Không thể tìm thấy thông tin đơn thuốc tương ứng'})
        }
    };

    //* Gab user detail information from FireStore
    const receiveUserData = async () => {
        if(!queryUserInfo) {
            setUserData('');
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
                SweetAlert.Toast.Error({title: 'Không tìm thấy thông tin bệnh nhân'});
                return;
            }

            querySnapshot.forEach((doc) => {
                //* doc.data() is never undefined for query doc snapshots
                setUserData(doc.data());
            });
            SweetAlert.Toast.Success({title: 'Tìm kiếm thông tin bệnh nhân thành công'})
        } catch (error) {
            SweetAlert.Toast.Error({title: 'Đã xảy ra lỗi', text: 'Không thể tìm thấy thông tin bệnh nhân tương ứng'})
        }
    };

    const sumTotalPrice = () => {
        const sumPrice = prescriptionData.reduce((accumulator, currentProduct) => {
            // Add the price of the current product to the accumulator
            return accumulator + currentProduct.price;
        }, 0);

        setTotalPrice(sumPrice);
    };

    //* Column Definitions: Defines & controls grid columns.
    const [colDefs, setColDefs] = useState([
        {
            headerName: 'Tên thuốc',
            field: 'name',
            wrapText: true,
            autoHeight: true,
            pinned: 'left',
            filter: true,
        },
        { headerName: 'Triệu chứng', field: 'symptom', wrapText: true, filter: true },
        { 
            headerName: 'Giá', 
            valueGetter: params => {
                return formatCurrency(params.data.cost);
            }, 
            filter: true 
        },
        { headerName: 'Liều lượng sử dụng', field: 'usage', wrapText: true, filter: true },
        { headerName: 'Thành phần dược', field: 'ingredient', wrapText: true, filter: true },
    ]);

    //* Make the AGGrid content automatically resize to fit the grid container size
    const autoSizeStrategy = {
        type: 'fitGridWidth',
        defaultMinWidth: 100,
    };

    useDebounce(receivePrescriptionData, [queryByIllnessName], 1000);
    useDebounce(receiveUserData, [queryUserInfo], 1000);

    //* Display Medicine List Table from FireStore whenever the symptom name changed (applied debounce)
    useEffect(() => {
        setMedicines([]);
        const { prescriptions } = symptom;
        if (!prescriptions) return;
        prescriptions.forEach((item) => {
            getMedicineFromReference(item);
        });
    }, [symptom]);

    return (
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
                    <input type='text' placeholder='VD: Có' className='input input-bordered w-full' disabled />
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
                </label>
            </section>

            {/* Only render the divider when prescriptionData have data */}
            {prescriptionData && (
                <section className='mt-4'>
                    <div className='divider divider-primary'></div>
                </section>
            )}

            <section className='w-full mt-8'>
                <div>
                    {medicines.length > 0 && (
                        <div className={`col-span-3`} style={{ width: '100%', height: 450 }}>
                            <header>
                                <h2 className='capitalize text-4xl font-bold text-primary text-center'>
                                    danh sách đơn thuốc
                                </h2>
                            </header>
                            <div className={`overflow-x-auto mt-8 ${themeValue === 'dark' ? 'ag-theme-quartz-dark' : 'ag-theme-quartz'}`} style={{ height: 500 }}>
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

                {prescriptionData && (
                    <p className='text-xl float-right my-4'>
                        Tổng:{' '}
                        <span className='text-green-600 font-extrabold italic underline underline-offset-4 decoration-2 decoration-sky-500'>
                            {formatCurrency(totalPrice)} VNĐ
                        </span>
                    </p>
                )}
            </section>
        </div>
    );
};

export default MedicalCertificate;
