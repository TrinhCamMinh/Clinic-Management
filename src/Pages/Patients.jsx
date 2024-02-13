import { GrPowerReset } from 'react-icons/gr';
import { FaSave, FaInfoCircle, FaHistory } from 'react-icons/fa';
import { FaEye, FaPencil, FaTrashCan } from 'react-icons/fa6';

import { AgGridReact } from 'ag-grid-react'; //* React Grid Logic
import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../hooks';
import { generateRandomID } from '../utils/General';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../Configs/firebase';
import { Alert } from '../utils/Alert';
import { getCurrentDate } from '../utils/General';

//* Cell Rendering:Actions column
const Actions = () => {
    return (
        <div className='flex items-center justify-between w-full h-full'>
            <button onClick={() => document.getElementById('detail_modal').showModal()}>
                <FaEye className='w-5 h-5 text-green-400' />
            </button>
            <button>
                <FaPencil className='w-5 h-5 text-yellow-400' />
            </button>
            <button onClick={() => document.getElementById('history_modal').showModal()}>
                <FaHistory className='w-5 h-5 text-blue-400' />
            </button>
            <button>
                <FaTrashCan className='w-5 h-5 text-red-400' />
            </button>
        </div>
    );
};

const Patients = () => {
    const currentDate = getCurrentDate(); //* get current Date for inserting new patients
    const themeValue = useTheme();
    const generateID = generateRandomID().toUpperCase();
    const [patient, setPatient] = useState('');

    const data = {
        name: useRef(null),
        phoneNumber: useRef(null),
        age: useRef(null),
        address: useRef(null),
        email: useRef(null),
    };

    const handleRowClicked = (event) => {
        const { data } = event;
        setPatient(data);
    };

    const checkboxSelection = function (params) {
        //* we put checkbox on the name if we are not doing grouping
        return params.api.getRowGroupColumns().length === 0;
    };

    const headerCheckboxSelection = function (params) {
        //* we put checkbox on the name if we are not doing grouping
        return params.api.getRowGroupColumns().length === 0;
    };

    //* Row Data: The data to be displayed.
    const [rowData, setRowData] = useState([]);

    //* Column Definitions: Defines & controls grid columns.
    const [colDefs, setColDefs] = useState([
        {
            headerName: 'Họ và Tên',
            field: 'name',
            wrapText: true,
            autoHeight: true,
            pinned: 'left',
            filter: true,
            checkboxSelection: checkboxSelection,
            headerCheckboxSelection: headerCheckboxSelection,
        },
        { headerName: 'SĐT', field: 'phoneNumber', wrapText: false },
        { headerName: 'Tuổi', field: 'age', filter: true },
        { headerName: 'Địa chỉ', field: 'address', wrapText: true, filter: true },
        { headerName: 'Mã sổ khám bệnh', field: 'medicalCode', wrapText: true, filter: true },
        {
            field: '',
            cellRenderer: Actions,
        },
    ]);

    //* Make the AGGrid content automatically resize to fit the grid container size
    const autoSizeStrategy = {
        type: 'fitGridWidth',
        defaultMinWidth: 100,
    };

    //* Mock history data
    const [history, setHistory] = useState([
        {
            'Ngày Khám': '25/11/2002',
            'Triệu Chứng': 'Corona Virus',
            'Phiếu Khám': '2023110001_0001',
            'Thành Tiền': '25.000 VNĐ',
        },
        {
            'Ngày Khám': '6/9/2024',
            'Triệu Chứng': 'Viêm Xoan',
            'Phiếu Khám': '2023110001_0002',
            'Thành Tiền': '22.000 VNĐ',
        },
        {
            'Ngày Khám': '18/11/2020',
            'Triệu Chứng': 'Cảm',
            'Phiếu Khám': '2023110001_0003',
            'Thành Tiền': '69.000 VNĐ',
        },
    ]);

    const [historyColDefs, setHistoryColDefs] = useState([
        { field: 'Ngày Khám' },
        { field: 'Triệu Chứng' },
        { field: 'Phiếu Khám' },
        { field: 'Thành Tiền' },
    ]);

    //* Get Patient List from Firebase Server (FireStore - Patients Collection)
    const getPatientList = async () => {
        const querySnapshot = await getDocs(collection(db, 'Patients'));
        querySnapshot.forEach((doc) => {
            const patient = doc.data();
            setRowData((prevData) => [
                ...prevData,
                {
                    name: patient.name,
                    phoneNumber: `0${patient.phoneNumber}`,
                    age: patient.age,
                    address: patient.address,
                    medicalCode: patient.medicalCode,
                    email: patient.email,
                    createdDate: patient.createdDate,
                    updatedDate: patient.updatedDate,
                },
            ]);
        });
    };

    //* Create Patient Data to Firebase Server (FireStore - Patients Collection)
    const submitCreatedData = async () => {
        try {
            const docRef = await addDoc(collection(db, 'Patients'), {
                name: data.name.current.value,
                email: data.email.current.value ?? null,
                phoneNumber: Number(data.phoneNumber.current.value),
                age: Number(data.age.current.value),
                address: data.address.current.value,
                medicalCode: generateID,
                createdDate: currentDate,
                updatedDate: currentDate,
            });

            console.log('Document written with ID: ', docRef.id);
            Alert({ toast: true, icon: 'success', text: 'Thêm mới dữ liệu thành công' });

            //* Update Patient List after creating data successfully
            setRowData((prevRowData) => {
                return [
                    ...prevRowData,
                    {
                        name: data.name.current.value,
                        phoneNumber: data.phoneNumber.current.value,
                        age: Number(data.age.current.value),
                        address: data.address.current.value,
                        medicalCode: generateID,
                    },
                ];
            });
        } catch (e) {
            Alert({ icon: 'error', title: 'Oops...', text: e.message });
        }
    };

    const refreshData = () => {
        data.name.current.value = null;
        data.phoneNumber.current.value = null;
        data.age.current.value = null;
        data.address.current.value = null;
    };

    useEffect(() => {
        //* Close modal after save data successfully
        //* And clear the data in the form
        const dialog = document.querySelector('#masterdata_patient_dialog');
        dialog.close();
        refreshData();

        //* Save the data to SS so we can load the data into Medical Certificate Input Page
        //! Note that: this is only temporary solution (later will use Server)
        const savePatientData = JSON.stringify(rowData);
        sessionStorage.setItem('patientsData', savePatientData);

        //* If we leave empty dependency useEffect will only run once in the initial render
        //* By passing the second argument an empty array,
        //* React will compare after each render the array and will see nothing was changed,
        //* thus calling the callback only after the first render.
    }, [rowData]);

    //* Get Patient List when component first mounted
    useEffect(() => {
        getPatientList();
    }, []);

    return (
        <div className='grid grid-cols-3 gap-4 md:gap-0'>
            <section className='col-span-3 mt-4'>
                <button
                    className='btn btn-success w-full'
                    onClick={() => document.getElementById('masterdata_patient_dialog').showModal()}
                >
                    Tạo mới dữ liệu
                </button>
            </section>

            <section className='col-span-3'>
                <div className='divider divider-primary uppercase'></div>
            </section>

            {/* Table Section  */}
            {/* Container with theme & dimensions */}
            <div
                className={`col-span-3 ${themeValue === 'light' ? 'ag-theme-quartz' : 'ag-theme-quartz-dark'}`}
                style={{ width: '100%', height: 450 }}
            >
                <h3 className='font-extrabold text-3xl text-primary text-center uppercase mb-4'>danh sách bệnh nhân</h3>

                {/* The AG Grid component */}
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    autoSizeStrategy={autoSizeStrategy}
                    rowSelection={'multiple'}
                    rowGroupPanelShow={'always'}
                    pagination={true}
                    paginationPageSize={20}
                    paginationPageSizeSelector={[20, 50, 100]}
                    suppressScrollOnNewData={true} //* tells the grid to NOT scroll to the top when the page changes.
                    reactiveCustomComponents
                    tooltipShowDelay={0}
                    tooltipHideDelay={2000}
                    onRowClicked={handleRowClicked}
                />
            </div>

            {/* Dialog Section */}
            <dialog id='masterdata_patient_dialog' className='modal'>
                <div className='modal-box w-11/12 max-w-5xl'>
                    <form method='dialog'>
                        {/* if there is a button in form, it will close the modal */}
                        <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>✕</button>
                    </form>

                    <h3 className='font-extrabold text-2xl text-center mb-4 uppercase text-primary'>
                        Form Thêm mới bệnh nhân
                    </h3>

                    {/* MasterData Input */}
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='col-span-2 xl:col-span-1'>
                            <label className='form-control w-full'>
                                <div className='label'>
                                    <span className='label-text'>Họ và tên</span>
                                </div>
                                <input
                                    type='text'
                                    placeholder='Vui lòng nhập họ và tên'
                                    className='input input-bordered w-full'
                                    ref={data.name}
                                />
                            </label>
                        </div>
                        <div className='col-span-2 xl:col-span-1'>
                            <label className='form-control w-full'>
                                <div className='label'>
                                    <span className='label-text'>Số điện thoại</span>
                                </div>
                                <input
                                    type='number'
                                    placeholder='Vui lòng nhập số điện thoại'
                                    className='input input-bordered w-full'
                                    ref={data.phoneNumber}
                                />
                            </label>
                        </div>
                        <div className='col-span-2 xl:col-span-1'>
                            <label className='form-control w-full'>
                                <div className='label'>
                                    <span className='label-text'>Tuổi</span>
                                </div>
                                <input
                                    type='number'
                                    placeholder='Vui lòng nhập số tuổi'
                                    className='input input-bordered w-full'
                                    ref={data.age}
                                />
                            </label>
                        </div>
                        <div className='col-span-2 xl:col-span-1'>
                            <label className='form-control w-full'>
                                <div className='label'>
                                    <span className='label-text'>Địa chỉ</span>
                                </div>
                                <input
                                    type='text'
                                    placeholder='Vui lòng nhập địa chỉ'
                                    className='input input-bordered w-full'
                                    ref={data.address}
                                />
                            </label>
                        </div>
                        <div className='col-span-2 xl:col-span-1'>
                            <label className='form-control w-full'>
                                <div className='label'>
                                    <span className='label-text'>Mã sổ khám bệnh</span>
                                    <div
                                        className='tooltip tooltip-info tooltip-left xl:tooltip-top'
                                        data-tip='Mã sổ khám được tạo tự động'
                                    >
                                        <FaInfoCircle className='w-4 h-4 text-sky-600 ' />
                                    </div>
                                </div>
                                <input
                                    value={generateID}
                                    type='text'
                                    placeholder='Vui lòng nhập mã sổ khám bệnh 2'
                                    className='input input-bordered w-full'
                                    disabled
                                />
                            </label>
                        </div>
                        <div className='col-span-2 xl:col-span-1'>
                            <label className='form-control w-full'>
                                <div className='label'>
                                    <span className='label-text'>Email</span>
                                </div>
                                <input
                                    type='email'
                                    placeholder='Vui lòng nhập email bệnh nhân'
                                    className='input input-bordered w-full'
                                    ref={data.email}
                                />
                            </label>
                        </div>
                    </div>

                    <div className='grid grid-cols-6 mt-8 gap-4 md:gap-8'>
                        <button
                            className='btn btn-error col-span-6 md:col-span-2 order-2 md:order-1 uppercase'
                            onClick={refreshData}
                        >
                            Làm mới dữ liệu
                            <GrPowerReset className='h-5 w-5' />
                        </button>
                        <button
                            className='btn btn-success col-span-6 md:col-span-4 order-1 md:order-2 uppercase'
                            onClick={submitCreatedData}
                        >
                            Lưu dữ liệu
                            <FaSave className='h-5 w-5' />
                        </button>
                    </div>
                </div>
            </dialog>

            <dialog id='history_modal' className='modal'>
                <div className='modal-box w-11/12 max-w-5xl'>
                    <h3 className='font-bold text-2xl text-center'>
                        Lịch sử khám - <span className='text-primary capitalize'>{patient.name}</span>
                    </h3>

                    <div
                        className={`mt-8 ${themeValue === 'light' ? 'ag-theme-quartz' : 'ag-theme-quartz-dark'}`}
                        style={{ height: 500 }}
                    >
                        {/* The AG Grid component */}
                        <AgGridReact
                            rowData={history}
                            columnDefs={historyColDefs}
                            autoSizeStrategy={autoSizeStrategy}
                            rowSelection={'multiple'}
                            rowGroupPanelShow={'always'}
                            pagination={true}
                            paginationPageSize={20}
                            paginationPageSizeSelector={[20, 50, 100]}
                            suppressScrollOnNewData={true} //* tells the grid to NOT scroll to the top when the page changes
                        />
                    </div>

                    <form method='dialog'>
                        {/* if there is a button in form, it will close the modal */}
                        <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>✕</button>
                    </form>
                </div>
            </dialog>

            <dialog id='detail_modal' className='modal'>
                <div className='modal-box w-11/12 max-w-5xl'>
                    <header>
                        <h3 className='font-bold text-2xl text-center'>
                            Thông tin chi tiết - <span className='text-primary capitalize'>{patient.name}</span>
                        </h3>

                        <div className='avatar w-full mt-8'>
                            <div className='w-24 rounded my-0 mx-auto'>
                                <img
                                    src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
                                    alt={`${patient.name}-avatar`}
                                />
                            </div>
                        </div>
                    </header>

                    <form method='dialog'>
                        {/* if there is a button in form, it will close the modal */}
                        <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>✕</button>
                    </form>

                    <div className='grid grid-col-1 md:grid-cols-2 gap-4'>
                        <label className='form-control w-full'>
                            <div className='label'>
                                <span className='label-text'>ID</span>
                            </div>
                            <input disabled type='text' placeholder='520H659' className='input input-bordered w-full' />
                        </label>
                        <label className='form-control w-full'>
                            <div className='label'>
                                <span className='label-text'>Mã Sổ Khám Bệnh</span>
                            </div>
                            <input
                                value={patient.medicalCode}
                                disabled
                                type='text'
                                className='input input-bordered w-full'
                            />
                        </label>
                        <label className='form-control w-full '>
                            <div className='label'>
                                <span className='label-text'>Họ và Tên</span>
                            </div>
                            <input disabled type='text' value={patient.name} className='input input-bordered w-full' />
                        </label>
                        <label className='form-control w-full '>
                            <div className='label'>
                                <span className='label-text'>Email</span>
                            </div>
                            <input disabled type='text' value={patient.email} className='input input-bordered w-full' />
                        </label>
                        <label className='form-control w-full '>
                            <div className='label'>
                                <span className='label-text'>Tuổi</span>
                            </div>
                            <input disabled type='text' value={patient.age} className='input input-bordered w-full' />
                        </label>
                        <label className='form-control w-full '>
                            <div className='label'>
                                <span className='label-text'>Địa chỉ</span>
                            </div>
                            <input
                                disabled
                                type='text'
                                value={patient.address}
                                className='input input-bordered w-full'
                            />
                        </label>
                        <label className='form-control w-full '>
                            <div className='label'>
                                <span className='label-text'>Ngày Tạo</span>
                            </div>
                            <input
                                disabled
                                type='text'
                                value={patient.createdDate}
                                className='input input-bordered w-full'
                            />
                        </label>
                        <label className='form-control w-full '>
                            <div className='label'>
                                <span className='label-text'>Ngày cập nhật mới nhất</span>
                            </div>
                            <input
                                disabled
                                type='text'
                                value={patient.updatedDate}
                                className='input input-bordered w-full'
                            />
                        </label>
                    </div>
                    <button className='btn btn-success btn-xs sm:btn-sm md:btn-md mt-8 w-full'>Cập nhật</button>
                </div>
            </dialog>
        </div>
    );
};

export default Patients;
