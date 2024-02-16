import { GrPowerReset } from 'react-icons/gr';
import { FaSave, FaInfoCircle, FaHistory } from 'react-icons/fa';
import { FaEye, FaPencil, FaTrashCan } from 'react-icons/fa6';

import '../index.css'
import { AgGridReact } from 'ag-grid-react'; //* React Grid Logic
import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../hooks';
import { generateRandomID, getCurrentDate } from '../utils/General';
import { collection, getDocs, addDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from '../Configs/firebase';
import { SweetAlert } from '../utils/Alert';

//* Cell Rendering:Actions column
const Actions = (params) => {
    const themeValue = useTheme();
    const { data, rowIndex, gridPatientsRef } = params; //* The first destructed param is Row Data
    const patientsRef = collection(db, 'Patients'); //* Create a reference to the Patients collection in FireStore (Firebase V9)

    //* Mock history data (History Collection Not Available in FireStore yet)
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

    const handleRemovePatient = async () => {
        try {
            const isConfirm = await SweetAlert.Toast.Confirm();

            // User rejected case
            if (!isConfirm) return;

            const selectedRow = gridPatientsRef.current.api.getSelectedRows();
            const { email } = data; // Take the code field in the document

            // Create a query against the collection.
            const q = query(patientsRef, where('email', '==', email));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const { ref } = doc;
                deleteDoc(ref);
            });

            // Remove the selected row in UI
            // This code is served for updating UI instantly
            gridPatientsRef.current.api.applyTransaction({ remove: selectedRow });

            SweetAlert.Toast.Success({ text: 'Xóa dữ liệu thành công' });
        } catch (error) {
            SweetAlert.Message.Error({ title: 'Xóa dữ liệu thất bại', text: error.message });
        }
    };

    return (
        <>
            <div className='flex items-center justify-between w-full h-full'>
                <button onClick={() => document.getElementById(`detail_modal_${rowIndex}`).showModal()}>
                    <FaEye className='w-5 h-5 text-green-400' />
                </button>
                <button>
                    <FaPencil className='w-5 h-5 text-yellow-400' />
                </button>
                <button onClick={() => document.getElementById(`history_modal_${rowIndex}`).showModal()}>
                    <FaHistory className='w-5 h-5 text-blue-400' />
                </button>
                <button onClick={handleRemovePatient}>
                    <FaTrashCan className='w-5 h-5 text-red-400' />
                </button>
            </div>

            {/* Detail Modal  */}
            <dialog id={`detail_modal_${rowIndex}`} className='modal'>
                <div className='modal-box w-11/12 max-w-5xl'>
                    <header>
                        <h3 className='font-bold text-2xl text-center'>Thông tin chi tiết người khám</h3>

                        <div className='avatar w-full mt-8'>
                            <div className='w-24 rounded my-0 mx-auto'>
                                <img
                                    src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
                                    alt={`${data.name}-avatar`}
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
                            <input
                                disabled
                                type='text'
                                defaultValue={data.id}
                                className='input input-bordered w-full'
                            />
                        </label>
                        <label className='form-control w-full'>
                            <div className='label'>
                                <span className='label-text'>Mã Sổ Khám Bệnh</span>
                            </div>
                            <input
                                disabled
                                defaultValue={data.medicalCode}
                                type='text'
                                className='input input-bordered w-full'
                            />
                        </label>
                        <label className='form-control w-full '>
                            <div className='label'>
                                <span className='label-text'>Họ và Tên</span>
                            </div>
                            <input
                                disabled
                                type='text'
                                defaultValue={data.name}
                                className='input input-bordered w-full'
                            />
                        </label>
                        <label className='form-control w-full '>
                            <div className='label'>
                                <span className='label-text'>Email</span>
                            </div>
                            <input
                                disabled
                                type='text'
                                defaultValue={data.email}
                                className='input input-bordered w-full'
                            />
                        </label>
                        <label className='form-control w-full '>
                            <div className='label'>
                                <span className='label-text'>Tuổi</span>
                            </div>
                            <input
                                disabled
                                type='text'
                                defaultValue={data.age}
                                className='input input-bordered w-full'
                            />
                        </label>
                        <label className='form-control w-full '>
                            <div className='label'>
                                <span className='label-text'>Địa chỉ</span>
                            </div>
                            <input
                                disabled
                                type='text'
                                defaultValue={data.address}
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
                                defaultValue={data.createdDate}
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
                                defaultValue={data.updatedDate}
                                className='input input-bordered w-full'
                            />
                        </label>
                    </div>
                    <button className='btn btn-success btn-xs sm:btn-sm md:btn-md mt-8 w-full'>Cập nhật</button>
                </div>
            </dialog>

            {/* History Modal  */}
            <dialog id={`history_modal_${rowIndex}`} className='modal'>
                <div className='modal-box w-11/12 max-w-5xl'>
                    <h3 className='font-bold text-2xl text-center'>
                        Lịch sử khám - <span className='text-primary capitalize'>{data.name}</span>
                    </h3>

                    <div className={`mt-8 ${themeValue === 'dark' ? 'ag-theme-quartz-dark' : ''}`} style={{ height: 500 }}>
                        {/* The AG Grid component */}
                        <AgGridReact
                            rowData={history}
                            columnDefs={historyColDefs}
                            rowSelection={'multiple'}
                            autoSizeStrategy={{
                                type: 'fitGridWidth',
                                defaultMinWidth: 100,
                            }}
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
        </>
    );
};

const Patients = () => {
    const gridPatientsRef = useRef();
    const currentDate = getCurrentDate(); //* get current Date for inserting new patients
    const themeValue = useTheme();
    const generateID = generateRandomID().toUpperCase(); //* ID generated by System will be all uppercased

    const data = {
        name: useRef(null),
        phoneNumber: useRef(null),
        age: useRef(null),
        address: useRef(null),
        email: useRef(null),
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
        { headerName: 'SĐT', field: 'phoneNumber'},
        { headerName: 'Tuổi', field: 'age', filter: true },
        { headerName: 'Địa chỉ', field: 'address', filter: true },
        { headerName: 'Mã sổ khám bệnh', field: 'medicalCode', filter: true },
        { headerName: 'Ngày tạo', field: 'createdDate', filter: true, sort: 'desc' },
        { headerName: 'Ngày cập nhật mới nhất', field: 'updatedDate', filter: true },
        {
            field: '',
            cellRenderer: Actions,

            //* Pass data to Actions Component
            cellRendererParams: {
                gridPatientsRef, //* Patinent List Table Instance
            },
        },
    ]);

    //* Make the AGGrid content automatically resize to fit the grid container size
    const autoSizeStrategy = {
        type: 'fitGridWidth',
        defaultMinWidth: 100,
    };

    //* Get Patient List from Firebase Server (FireStore - Patients Collection)
    const getPatientList = async () => {
        const querySnapshot = await getDocs(collection(db, 'Patients'));
        querySnapshot.forEach((doc) => {
            const { id } = doc;
            const patient = doc.data();
            setRowData((prevData) => [
                ...prevData,
                {
                    id, // ID auto generated by FireStore
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
            SweetAlert.Toast.Success({ text: 'Thêm mới dữ liệu thành công' });

            //* Update Patient List UI instantly after creating data successfully
            setRowData((prevRowData) => {
                return [
                    ...prevRowData,
                    {
                        name: data.name.current.value,
                        phoneNumber: data.phoneNumber.current.value,
                        age: Number(data.age.current.value),
                        address: data.address.current.value,
                        medicalCode: generateID,
                        createdDate: currentDate,
                        updatedDate: currentDate,
                    },
                ];
            });
        } catch (error) {
            closeModal('#masterdata_patient_dialog');
            SweetAlert.Message.Error({ title: 'Tạo dữ liệu thất bại', text: error.message });
        }
    };

    const refreshData = () => {
        data.name.current.value = '';
        data.phoneNumber.current.value = '';
        data.age.current.value = '';
        data.address.current.value = '';
        data.email.current.value = '';
    };

    const closeModal = (modalID) => {
        const dialog = document.querySelector(modalID);
        dialog.close();
    };

    useEffect(() => {
        //* Close modal after save data successfully
        //* And clear the data in the form
        closeModal('#masterdata_patient_dialog');
        refreshData();
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
                className={`col-span-3 font-sans ${themeValue === 'dark' ? 'ag-theme-quartz-dark' : 'ag-theme-quartz'}`}
                style={{ width: '100%', height: 450 }}
            >
                <h3 className='font-extrabold text-3xl text-primary text-center uppercase mb-4'>danh sách bệnh nhân</h3>

                {/* The AG Grid component */}
                <AgGridReact
                    ref={gridPatientsRef}
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
        </div>
    );
};

export default Patients;
