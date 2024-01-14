import { FaPlus, FaSave } from 'react-icons/fa';
import { GrPowerReset } from 'react-icons/gr';
import { FaEye, FaPencil, FaTrashCan } from 'react-icons/fa6';
import { useState } from 'react';
import { useTheme } from '../hooks';
import { AgGridReact } from 'ag-grid-react';

const Disease = () => {
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
            'Mã đơn thuốc': '911007124616479',
            'Loại bệnh': 'NASA',
            'Ngày tạo': '2024-1-14',
        },
        {
            'Mã đơn thuốc': '911007124616479',
            'Loại bệnh': 'NASA',
            'Ngày tạo': '2024-1-14',
        },
        {
            'Mã đơn thuốc': '911007124616479',
            'Loại bệnh': 'NASA',
            'Ngày tạo': '2024-1-14',
        },
    ]);

    //* Column Definitions: Defines & controls grid columns.
    const [colDefs, setColDefs] = useState([
        {
            field: 'Mã đơn thuốc',
            wrapText: true,
            autoHeight: true,
            pinned: 'left',
            filter: true,
            checkboxSelection: checkboxSelection,
            headerCheckboxSelection: headerCheckboxSelection,
        },
        { field: 'Loại bệnh', wrapText: true, filter: true },
        { field: 'Ngày tạo', wrapText: true, filter: true },
    ]);

    //* Make the AGGrid content automatically resize to fit the grid container size
    const autoSizeStrategy = {
        type: 'fitGridWidth',
        defaultMinWidth: 100,
    };

    return (
        <div className='grid grid-cols-1 gap-4 md:gap-0'>
            <section className='col-span-1 mt-4'>
                <button
                    className='btn btn-success w-full'
                    onClick={() => document.getElementById('masterdata_disease_dialog').showModal()}
                >
                    Tạo mới dữ liệu
                </button>
            </section>

            <section className='col-span-1'>
                <div className='divider divider-primary w-full uppercase'>or</div>
            </section>

            {/* Table Section  */}
            <section className='col-span-1'>
                {/* Container with theme & dimensions */}
                <div
                    className={`col-span-3 ${themeValue === 'light' ? 'ag-theme-quartz' : 'ag-theme-quartz-dark'}`}
                    style={{ width: '100%', height: 450 }}
                >
                    <h3 className='font-extrabold text-3xl text-primary text-center uppercase mb-4'>
                        danh sách các đơn thuốc
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
            <dialog id='masterdata_disease_dialog' className='modal'>
                <div className='modal-box w-11/12 max-w-5xl'>
                    <form method='dialog'>
                        {/* if there is a button in form, it will close the modal */}
                        <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>✕</button>
                    </form>

                    <h3 className='font-bold text-2xl text-center mb-4 uppercase text-primary'>
                        form thêm mới triệu chứng bệnh - mã đơn thuốc{' '}
                        <span className='text-red-400 ml-2'>520H0659</span>
                    </h3>

                    {/* MasterData Input */}
                    <div className='grid grid-cols-1'>
                        <section className='col-span-1'>
                            <label className='form-control w-full'>
                                <div className='label'>
                                    <span className='label-text'>Tên triệu chứng</span>
                                </div>
                                <input
                                    type='text'
                                    placeholder='Vui lòng nhập tên triệu chứng'
                                    className='input input-bordered w-full'
                                />
                            </label>
                            <label className='form-control w-full'>
                                <div className='label'>
                                    <span className='label-text'>Mô tả triệu chứng</span>
                                </div>
                                <input
                                    type='text'
                                    placeholder='Vui lòng nhập mô tả triệu chứng'
                                    className='input input-bordered w-full'
                                />
                            </label>
                        </section>

                        <section className='col-span-1'>
                            <div className='divider divider-primary w-full uppercase'>or</div>
                        </section>

                        <section className='col-span-1 overflow-x-auto'>
                            <table className='table table-sm col-span-1'>
                                {/* head */}
                                <thead>
                                    <tr className='text-center'>
                                        <th colSpan={5} className='uppercase text-xl italic'>
                                            ĐƠN THUỐC DÙNG - MÃ ĐƠN THUỐC{' '}
                                            <span className='text-red-400 ml-2'>520H0659</span>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <th>Tên thuốc</th>
                                        <th>Hàm lượng</th>
                                        <th>Liều dùng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row 1 */}
                                    <tr>
                                        <th>1</th>
                                        <td>
                                            <input
                                                type='text'
                                                placeholder='Type here'
                                                className='input input-bordered input-sm w-full max-w-xs'
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type='text'
                                                placeholder='Type here'
                                                className='input input-bordered input-sm w-full max-w-xs'
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type='text'
                                                placeholder='Type here'
                                                className='input input-bordered input-sm w-full max-w-xs'
                                            />
                                        </td>
                                        <td>
                                            <button
                                                className='btn btn-ghost tooltip tooltip-error'
                                                data-tip='Xóa dữ liệu dòng'
                                            >
                                                <FaTrashCan className='h-5 w-5 text-red-600' />
                                            </button>
                                        </td>
                                    </tr>
                                    {/* row 2 */}
                                    <tr>
                                        <th>2</th>
                                        <td>
                                            <input
                                                type='text'
                                                placeholder='Type here'
                                                className='input input-bordered input-sm w-full max-w-xs'
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type='text'
                                                placeholder='Type here'
                                                className='input input-bordered input-sm w-full max-w-xs'
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type='text'
                                                placeholder='Type here'
                                                className='input input-bordered input-sm w-full max-w-xs'
                                            />
                                        </td>
                                        <td>
                                            <button
                                                className='btn btn-ghost tooltip tooltip-error'
                                                data-tip='Xóa dữ liệu dòng'
                                            >
                                                <FaTrashCan className='h-5 w-5 text-red-600' />
                                            </button>
                                        </td>
                                    </tr>
                                    {/* row 3 */}
                                    <tr>
                                        <th>3</th>
                                        <td>
                                            <input
                                                type='text'
                                                placeholder='Type here'
                                                className='input input-bordered input-sm w-full max-w-xs'
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type='text'
                                                placeholder='Type here'
                                                className='input input-bordered input-sm w-full max-w-xs'
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type='text'
                                                placeholder='Type here'
                                                className='input input-bordered input-sm w-full max-w-xs'
                                            />
                                        </td>
                                        <td>
                                            <button
                                                className='btn btn-ghost tooltip tooltip-error'
                                                data-tip='Xóa dữ liệu dòng'
                                            >
                                                <FaTrashCan className='h-5 w-5 text-red-600' />
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th colSpan={5} className='text-center'>
                                            <button className='btn btn-outline btn-error btn-sm uppercase mr-4'>
                                                Làm mới dữ liệu
                                                <GrPowerReset className='h5 w-5' />
                                            </button>
                                            <button className='btn btn-outline btn-success btn-sm btn-wide uppercase'>
                                                Thêm mới dữ liệu
                                                <FaPlus className='h5 w-5' />
                                            </button>
                                        </th>
                                    </tr>
                                </tfoot>
                            </table>
                        </section>
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

export default Disease;
