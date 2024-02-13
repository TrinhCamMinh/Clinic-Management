import { FaInfoCircle } from 'react-icons/fa';

import { getCurrentDate, formatCurrency } from '../utils/General';
import { useRef, useState, useEffect } from 'react';
import { useDebounce } from '../hooks/index';
import { AgGridReact } from 'ag-grid-react'; //* React Grid Logic
import { collection, query, where, getDocs, getDoc, doc } from 'firebase/firestore';
import { db } from '../Configs/firebase';

const MedicalCertificate = () => {
    const [queryByIllnessName, setQueryByIllnessName] = useState(null);
    const [prescriptionData, setPrescriptionData] = useState(null); //! Consider Remove
    const [symptom, setSymptom] = useState('');
    const [medicines, setMedicines] = useState([]); //* Contain each medicine object after query them from reference in Symptoms Collection

    const [queryUserInfo, setQueryUserInfo] = useState('');
    const [userData, setUserData] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);

    const data = {
        phoneNumber: useRef(null),
        comebackDay: useRef(null),
        illnessName: queryByIllnessName, //* tên triệu chứng
    };

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

    const receivePrescriptionData = async () => {
        const symptomsRef = collection(db, 'Symptoms');

        // Create a query against the collection.
        const q = query(symptomsRef, where('name', '==', queryByIllnessName));

        // After creating a query object, use the get() function to retrieve the results
        const querySnapshot = await getDocs(q);

        //* Not Found Case
        if (querySnapshot.size === 0) {
            setSymptom('');
            return;
        }

        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            setSymptom(doc.data());
        });
    };

    useEffect(() => {
        setMedicines([]);
        const { prescriptions } = symptom;
        if (!prescriptions) return;
        prescriptions.forEach((item) => {
            getMedicineFromReference(item);
        });
    }, [symptom]);

    const receiveUserData = async () => {
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
            return;
        }

        querySnapshot.forEach((doc) => {
            //* doc.data() is never undefined for query doc snapshots
            setUserData(doc.data());
        });
    };

    const sumTotalPrice = () => {
        const sumPrice = prescriptionData.reduce((accumulator, currentProduct) => {
            // Add the price of the current product to the accumulator
            return accumulator + currentProduct.price;
        }, 0);

        setTotalPrice(sumPrice);
    };

    useDebounce(receivePrescriptionData, [queryByIllnessName], 1000);
    useDebounce(receiveUserData, [queryUserInfo], 1000);

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
        { headerName: 'Giá', field: 'cost', filter: true },
        { headerName: 'Liều lượng sử dụng', field: 'usage', wrapText: true, filter: true },
        { headerName: 'Thành phần dược', field: 'ingredient', wrapText: true, filter: true },
    ]);

    //* Make the AGGrid content automatically resize to fit the grid container size
    const autoSizeStrategy = {
        type: 'fitGridWidth',
        defaultMinWidth: 100,
    };

    useEffect(() => {
        if (!prescriptionData || prescriptionData.length === 0) return;

        sumTotalPrice();
    }, [prescriptionData]);

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
                        ref={data.comebackDay}
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
                <div className='overflow-x-auto'>
                    {medicines.length > 0 && (
                        <div className={`col-span-3`} style={{ width: '100%', height: 450 }}>
                            <header>
                                <h2 className='capitalize text-4xl font-bold text-primary text-center'>
                                    danh sách đơn thuốc
                                </h2>
                            </header>
                            <div className='ag-theme-quartz mt-8' style={{ height: 500 }}>
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
