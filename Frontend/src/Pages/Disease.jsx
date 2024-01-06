import { FaPlus } from 'react-icons/fa';
import { GrPowerReset } from 'react-icons/gr';
import { FaEye, FaPencil, FaTrashCan } from 'react-icons/fa6';

const Disease = () => {
    return (
        <>
            <div className='grid grid-cols-1 gap-4'>
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

                <div className='divider divider-primary w-full uppercase'>or</div>

                {/* Table Section  */}
                <div className='overflow-x-auto'>
                    <table className='table table-lg xl:table-sm'>
                        {/* head */}
                        <thead>
                            <tr className='text-center'>
                                <th colSpan={5} className='uppercase text-xl italic'>
                                    ĐƠN THUỐC DÙNG - MÃ ĐƠN THUỐC
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
                                    <button className='btn btn-ghost tooltip tooltip-error' data-tip='Xóa dữ liệu dòng'>
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
                                    <button className='btn btn-ghost tooltip tooltip-error' data-tip='Xóa dữ liệu dòng'>
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
                                    <button className='btn btn-ghost tooltip tooltip-error' data-tip='Xóa dữ liệu dòng'>
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

                    <div className='divider divider-primary w-full uppercase'>or</div>

                    <div className='overflow-x-auto'>
                        <table className='table table-zebra table-md xl:table-sm'>
                            {/* head */}
                            <thead>
                                <tr>
                                    <th colSpan={5} className='uppercase text-xl italic text-center'>
                                        Danh sách các đơn thuốc
                                    </th>
                                </tr>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Job</th>
                                    <th>Favorite Color</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                <tr>
                                    <th>1</th>
                                    <td>Cy Ganderton</td>
                                    <td>Quality Control Specialist</td>
                                    <td>Blue</td>
                                    <td>
                                        <button
                                            className='btn btn-ghost tooltip tooltip-success'
                                            data-tip='Xem chi tiết dữ liệu'
                                        >
                                            <FaEye className='h-5 w-5 text-green-600' />
                                        </button>
                                        <button
                                            className='btn btn-ghost tooltip tooltip-warning'
                                            data-tip='Cập nhật dữ liệu'
                                        >
                                            <FaPencil className='h-5 w-5 text-yellow-600' />
                                        </button>
                                        <button className='btn btn-ghost tooltip tooltip-error' data-tip='Xóa dữ liệu'>
                                            <FaTrashCan className='h-5 w-5 text-red-600' />
                                        </button>
                                    </td>
                                </tr>
                                {/* row 2 */}
                                <tr>
                                    <th>2</th>
                                    <td>Hart Hagerty</td>
                                    <td>Desktop Support Technician</td>
                                    <td>Purple</td>
                                    <td>
                                        <button
                                            className='btn btn-ghost tooltip tooltip-success'
                                            data-tip='Xem chi tiết dữ liệu'
                                        >
                                            <FaEye className='h-5 w-5 text-green-600' />
                                        </button>
                                        <button
                                            className='btn btn-ghost tooltip tooltip-warning'
                                            data-tip='Cập nhật dữ liệu'
                                        >
                                            <FaPencil className='h-5 w-5 text-yellow-600' />
                                        </button>
                                        <button className='btn btn-ghost tooltip tooltip-error' data-tip='Xóa dữ liệu'>
                                            <FaTrashCan className='h-5 w-5 text-red-600' />
                                        </button>
                                    </td>
                                </tr>
                                {/* row 3 */}
                                <tr>
                                    <th>3</th>
                                    <td>Brice Swyre</td>
                                    <td>Tax Accountant</td>
                                    <td>Red</td>
                                    <td>
                                        <button
                                            className='btn btn-ghost tooltip tooltip-success'
                                            data-tip='Xem chi tiết dữ liệu'
                                        >
                                            <FaEye className='h-5 w-5 text-green-600' />
                                        </button>
                                        <button
                                            className='btn btn-ghost tooltip tooltip-warning'
                                            data-tip='Cập nhật dữ liệu'
                                        >
                                            <FaPencil className='h-5 w-5 text-yellow-600' />
                                        </button>
                                        <button className='btn btn-ghost tooltip tooltip-error' data-tip='Xóa dữ liệu'>
                                            <FaTrashCan className='h-5 w-5 text-red-600' />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Job</th>
                                    <th>Favorite Color</th>
                                    <th></th>
                                </tr>
                                <tr>
                                    <th colSpan={5}>
                                        <div className='float-right'>
                                            <div className='join'>
                                                <button className='join-item btn btn-sm'>«</button>
                                                <button className='join-item btn btn-sm'>Page 22</button>
                                                <button className='join-item btn btn-sm'>»</button>
                                            </div>
                                        </div>
                                    </th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Disease;
