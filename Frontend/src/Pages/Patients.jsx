import { GrPowerReset } from 'react-icons/gr';
import { FaSave } from 'react-icons/fa';
import { AgGridReact } from 'ag-grid-react'; //* React Grid Logic
import { useState } from 'react';
import { useTheme } from '../hooks';

const Patients = () => {
    const themeValue = useTheme();

    const checkboxSelection = function (params) {
        //* we put checkbox on the name if we are not doing grouping
        return params.api.getRowGroupColumns().length === 0;
    };

    const headerCheckboxSelection = function (params) {
        //* we put checkbox on the name if we are not doing grouping
        return params.api.getRowGroupColumns().length === 0;
    };

    //* Row Data: The data to be displayed.
    const [rowData, setRowData] = useState([
        {
            'Họ và Tên': 'Katherine Rogahn II',
            SĐT: '986-276-7182',
            Tuổi: 23,
            'Địa chỉ': 'Port Lianastead',
            'Mã sổ khám bệnh': '362434918667748',
        },
        {
            'Họ và Tên': 'Kim Kassulke',
            SĐT: '293.211.2563',
            Tuổi: 5,
            'Địa chỉ': 'Lake Alexandrea',
            'Mã sổ khám bệnh': '507976908900890',
        },
        {
            'Họ và Tên': 'Katherine Rogahn II',
            SĐT: '986-276-7182',
            Tuổi: 23,
            'Địa chỉ': 'Port Lianastead',
            'Mã sổ khám bệnh': '362434918667748',
        },
        {
            'Họ và Tên': 'Eugene Dickens',
            SĐT: '1-958-684-2909',
            Tuổi: 6,
            'Địa chỉ': 'Heaneychester',
            'Mã sổ khám bệnh': '918641795798676',
        },
        {
            'Họ và Tên': 'Delores Parisian-Halvorson',
            SĐT: '451-712-6690',
            Tuổi: 18,
            'Địa chỉ': 'West Darrellshire',
            'Mã sổ khám bệnh': '204728462340777',
        },
    ]);

    //* Column Definitions: Defines & controls grid columns.
    const [colDefs, setColDefs] = useState([
        {
            field: 'Họ và Tên',
            wrapText: true,
            autoHeight: true,
            pinned: 'left',
            filter: true,
            checkboxSelection: checkboxSelection,
            headerCheckboxSelection: headerCheckboxSelection,
        },
        { field: 'SĐT', wrapText: true, filter: true },
        { field: 'Tuổi', wrapText: true, filter: true },
        { field: 'Địa chỉ', wrapText: true, filter: true },
        { field: 'Mã sổ khám bệnh', wrapText: true, filter: true },
    ]);

    //* Make the AGGrid content automatically resize to fit the grid container size
    const autoSizeStrategy = {
        type: 'fitGridWidth',
        defaultMinWidth: 100,
    };

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
                <div className='divider divider-primary uppercase'>or</div>
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
                                />
                            </label>
                        </div>
                        <div className='col-span-2 xl:col-span-1'>
                            <label className='form-control w-full'>
                                <div className='label'>
                                    <span className='label-text'>Mã sổ khám bệnh</span>
                                </div>
                                <input
                                    type='text'
                                    placeholder='Vui lòng nhập mã sổ khám bệnh'
                                    className='input input-bordered w-full'
                                />
                            </label>
                        </div>
                        <div className='col-span-2 xl:col-span-1'>
                            <label className='form-control w-full'>
                                <div className='label'>
                                    <span className='label-text'>Ngày sinh</span>
                                </div>
                                <input
                                    type='date'
                                    placeholder='Vui lòng nhập ngày sinh'
                                    className='input input-bordered w-full'
                                />
                            </label>
                        </div>
                    </div>

                    <div className='grid grid-cols-6 mt-8 gap-4 md:gap-8'>
                        <button className='btn btn-error col-span-6 md:col-span-2 order-2 md:order-1 uppercase'>
                            Làm mới dữ liệu
                            <GrPowerReset className='h-5 w-5' />
                        </button>
                        <button className='btn btn-success col-span-6 md:col-span-4 order-1 md:order-2 uppercase'>
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
