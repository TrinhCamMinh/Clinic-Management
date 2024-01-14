import { FaEye, FaPencil, FaTrashCan } from 'react-icons/fa6';
import { GrPowerReset } from 'react-icons/gr';
import { FaSave } from 'react-icons/fa';
import { useState } from 'react';
import { useTheme } from '../hooks';
import { AgGridReact } from 'ag-grid-react'; //* React Grid Logic

const Medicine = () => {
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
            'Tên dược liệu': 'Omnigender',
            'Loại bệnh': 'Return to Sender',
            'Thành phần dược': 'Cape Canaveral',
            'Hàm lượng': 4,
            'Liều lượng': 10,
            'Số lượng tồn kho': 56,
            'Giá dược liệu/viên': 68,
        },
        {
            'Tên dược liệu': 'Omnigender',
            'Loại bệnh': 'Return to Sender',
            'Thành phần dược': 'Cape Canaveral',
            'Hàm lượng': 4,
            'Liều lượng': 10,
            'Số lượng tồn kho': 56,
            'Giá dược liệu/viên': 68,
        },
        {
            'Tên dược liệu': 'Omnigender',
            'Loại bệnh': 'Return to Sender',
            'Thành phần dược': 'Cape Canaveral',
            'Hàm lượng': 4,
            'Liều lượng': 10,
            'Số lượng tồn kho': 56,
            'Giá dược liệu/viên': 68,
        },
        {
            'Tên dược liệu': 'Omnigender',
            'Loại bệnh': 'Return to Sender',
            'Thành phần dược': 'Cape Canaveral',
            'Hàm lượng': 4,
            'Liều lượng': 10,
            'Số lượng tồn kho': 56,
            'Giá dược liệu/viên': 68,
        },
        {
            'Tên dược liệu': 'Omnigender',
            'Loại bệnh': 'Return to Sender',
            'Thành phần dược': 'Cape Canaveral',
            'Hàm lượng': 4,
            'Liều lượng': 10,
            'Số lượng tồn kho': 56,
            'Giá dược liệu/viên': 68,
        },
    ]);

    //* Column Definitions: Defines & controls grid columns.
    const [colDefs, setColDefs] = useState([
        {
            field: 'Tên dược liệu',
            wrapText: true,
            autoHeight: true,
            pinned: 'left',
            filter: true,
            checkboxSelection: checkboxSelection,
            headerCheckboxSelection: headerCheckboxSelection,
        },
        { field: 'Loại bệnh', wrapText: true, filter: true },
        { field: 'Thành phần dược', wrapText: true, filter: true },
        { field: 'Hàm lượng', wrapText: true, filter: true },
        { field: 'Liều lượng', wrapText: true, filter: true },
        { field: 'Số lượng tồn kho', wrapText: true, filter: true },
        { field: 'Giá dược liệu/viên', wrapText: true, filter: true },
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
                    onClick={() => document.getElementById('masterdata_medicine_dialog').showModal()}
                >
                    Tạo mới dữ liệu
                </button>
            </section>

            <section className='col-span-3'>
                <div className='divider divider-primary uppercase'>or</div>
            </section>

            {/* Table Section  */}
            <section className='col-span-3'>
                {/* Container with theme & dimensions */}
                <div
                    className={`col-span-3 ${themeValue === 'light' ? 'ag-theme-quartz' : 'ag-theme-quartz-dark'}`}
                    style={{ width: '100%', height: 450 }}
                >
                    <h3 className='font-extrabold text-3xl text-primary text-center uppercase mb-4'>
                        danh sách dược liệu
                    </h3>

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
            </section>

            {/* Dialog Section */}
            <dialog id='masterdata_medicine_dialog' className='modal'>
                <div className='modal-box w-11/12 max-w-5xl'>
                    <form method='dialog'>
                        {/* if there is a button in form, it will close the modal */}
                        <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>✕</button>
                    </form>

                    <h3 className='font-bold text-2xl text-center mb-4 uppercase text-primary'>
                        form thêm mới dược liệu
                    </h3>

                    {/* MasterData Input */}
                    <div className='grid grid-cols-2 gap-3'>
                        <div className='col-span-2'>
                            <label className='form-control w-full'>
                                <div className='label'>
                                    <span className='label-text'>Tên thuốc</span>
                                </div>
                                <input
                                    type='text'
                                    placeholder='Vui lòng nhập tên thuốc'
                                    className='input input-bordered w-full'
                                />
                            </label>
                        </div>
                        <label className='form-control w-full col-span-2 xl:col-span-1'>
                            <div className='label'>
                                <span className='label-text'>Loại bệnh</span>
                            </div>
                            <input
                                type='tel'
                                placeholder='Vui lòng nhập loại bệnh'
                                className='input input-bordered w-full'
                            />
                        </label>
                        <label className='form-control w-full col-span-2 xl:col-span-1'>
                            <div className='label'>
                                <span className='label-text'>Thành phần dược</span>
                            </div>
                            <input
                                type='text'
                                placeholder='Vui lòng nhập thành phần dược'
                                className='input input-bordered w-full'
                            />
                        </label>
                        <label className='form-control w-full col-span-2 xl:col-span-1'>
                            <div className='label'>
                                <span className='label-text'>Giá</span>
                            </div>
                            <input
                                type='number'
                                placeholder='Vui lòng nhập giá'
                                className='input input-bordered w-full'
                            />
                        </label>
                        <label className='form-control w-full col-span-2 xl:col-span-1'>
                            <div className='label'>
                                <span className='label-text'>Hàm lượng</span>
                            </div>
                            <input
                                type='text'
                                placeholder='Vui lòng nhập hàm lượng'
                                className='input input-bordered w-full'
                            />
                        </label>
                        <label className='form-control w-full col-span-2 xl:col-span-1'>
                            <div className='label'>
                                <span className='label-text'>Liều Thuốc</span>
                            </div>
                            <input
                                type='text'
                                placeholder='Vui lòng nhập liều thuốc'
                                className='input input-bordered w-full'
                            />
                        </label>
                        <label className='form-control w-full col-span-2 xl:col-span-1'>
                            <div className='label'>
                                <span className='label-text'>Số lượng Tồn kho</span>
                            </div>
                            <input
                                type='number'
                                placeholder='Vui lòng nhập số lượng tồn kho'
                                className='input input-bordered w-full'
                            />
                        </label>
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

export default Medicine;
