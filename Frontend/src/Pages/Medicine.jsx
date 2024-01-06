import { FaEye, FaPencil, FaTrashCan } from 'react-icons/fa6';

const Medicine = () => {
    return (
        <div className='grid grid-cols-3 gap-3'>
            <div className='col-span-3'>
                <label className='form-control w-full'>
                    <div className='label'>
                        <span className='label-text'>Tên thuốc</span>
                    </div>
                    <input type='text' placeholder='Vui lòng nhập tên thuốc' className='input input-bordered w-full' />
                </label>
            </div>
            <label className='form-control w-full col-span-3 xl:col-span-1'>
                <div className='label'>
                    <span className='label-text'>Loại bệnh</span>
                </div>
                <input type='tel' placeholder='Vui lòng nhập loại bệnh' className='input input-bordered w-full' />
            </label>
            <label className='form-control w-full col-span-3 xl:col-span-1'>
                <div className='label'>
                    <span className='label-text'>Thành phần dược</span>
                </div>
                <input
                    type='text'
                    placeholder='Vui lòng nhập thành phần dược'
                    className='input input-bordered w-full'
                />
            </label>
            <label className='form-control w-full col-span-3 xl:col-span-1'>
                <div className='label'>
                    <span className='label-text'>Giá</span>
                </div>
                <input type='number' placeholder='Vui lòng nhập giá' className='input input-bordered w-full' />
            </label>
            <label className='form-control w-full col-span-3 xl:col-span-1'>
                <div className='label'>
                    <span className='label-text'>Hàm lượng</span>
                </div>
                <input type='text' placeholder='Vui lòng nhập hàm lượng' className='input input-bordered w-full' />
            </label>
            <label className='form-control w-full col-span-3 xl:col-span-1'>
                <div className='label'>
                    <span className='label-text'>Liều Thuốc</span>
                </div>
                <input type='text' placeholder='Vui lòng nhập liều thuốc' className='input input-bordered w-full' />
            </label>
            <label className='form-control w-full col-span-3 xl:col-span-1'>
                <div className='label'>
                    <span className='label-text'>Số lượng Tồn kho</span>
                </div>
                <input
                    type='number'
                    placeholder='Vui lòng nhập số lượng tồn kho'
                    className='input input-bordered w-full'
                />
            </label>

            <div className='col-start-1 mt-4'>
                <button className='btn btn-error col-span-1 w-full text-xs xl:text-2xl'>Làm mới dữ liệu</button>
            </div>

            <div className='col-start-2 col-span-2 mt-4'>
                <button className='btn btn-success w-full'>Tạo mới dữ liệu</button>
            </div>

            <div className='col-span-3'>
                <div className='divider divider-primary uppercase'>or</div>
            </div>

            <div className='col-span-3'>
                <input
                    type='text'
                    placeholder='Tìm kiếm'
                    className='input input-bordered input-md w-full max-w-xs mb-4 col-start-3'
                />
                <div className='overflow-x-auto'>
                    <table className='table table-zebra table-lg xl:table-sm'>
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    <label>
                                        <input type='checkbox' className='checkbox' />
                                    </label>
                                </th>
                                <th>Name</th>
                                <th>Job</th>
                                <th>Favorite Color</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            <tr className='hover'>
                                <th>
                                    <label>
                                        <input type='checkbox' className='checkbox' />
                                    </label>
                                </th>
                                <td>
                                    <div className='flex items-center gap-3'>
                                        <div className='avatar'>
                                            <div className='mask mask-squircle w-12 h-12'>
                                                <img
                                                    src='https://i.pravatar.cc/300?img=3'
                                                    alt='Avatar Tailwind CSS Component'
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className='font-bold'>Hart Hagerty</div>
                                            <div className='text-sm opacity-50'>United States</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    Zemlak, Daniel and Leannon
                                    <br />
                                    <span className='badge badge-ghost badge-sm'>Desktop Support Technician</span>
                                </td>
                                <td>
                                    <div className='badge badge-neutral'>neutral</div>
                                </td>
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
                            <tr className='hover'>
                                <th>
                                    <label>
                                        <input type='checkbox' className='checkbox' />
                                    </label>
                                </th>
                                <td>
                                    <div className='flex items-center gap-3'>
                                        <div className='avatar'>
                                            <div className='mask mask-squircle w-12 h-12'>
                                                <img
                                                    src='https://i.pravatar.cc/300?img=4'
                                                    alt='Avatar Tailwind CSS Component'
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className='font-bold'>Brice Swyre</div>
                                            <div className='text-sm opacity-50'>China</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    Carroll Group
                                    <br />
                                    <span className='badge badge-ghost badge-sm'>Tax Accountant</span>
                                </td>
                                <td>
                                    <div className='badge badge-primary'>primary</div>
                                </td>
                                <th>
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
                                </th>
                            </tr>
                            {/* row 3 */}
                            <tr className='hover'>
                                <th>
                                    <label>
                                        <input type='checkbox' className='checkbox' />
                                    </label>
                                </th>
                                <td>
                                    <div className='flex items-center gap-3'>
                                        <div className='avatar'>
                                            <div className='mask mask-squircle w-12 h-12'>
                                                <img
                                                    src='https://i.pravatar.cc/300?img=5'
                                                    alt='Avatar Tailwind CSS Component'
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className='font-bold'>Marjy Ferencz</div>
                                            <div className='text-sm opacity-50'>Russia</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    Rowe-Schoen
                                    <br />
                                    <span className='badge badge-ghost badge-sm'>Office Assistant I</span>
                                </td>
                                <td>
                                    <div className='badge badge-secondary'>secondary</div>
                                </td>
                                <th>
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
                                </th>
                            </tr>
                            {/* row 4 */}
                            <tr className='hover'>
                                <th>
                                    <label>
                                        <input type='checkbox' className='checkbox' />
                                    </label>
                                </th>
                                <td>
                                    <div className='flex items-center gap-3'>
                                        <div className='avatar'>
                                            <div className='mask mask-squircle w-12 h-12'>
                                                <img
                                                    src='https://i.pravatar.cc/300?img=6'
                                                    alt='Avatar Tailwind CSS Component'
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className='font-bold'>Yancy Tear</div>
                                            <div className='text-sm opacity-50'>Brazil</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    Wyman-Ledner
                                    <br />
                                    <span className='badge badge-ghost badge-sm'>Community Outreach Specialist</span>
                                </td>
                                <td>
                                    <div className='badge badge-accent'>accent</div>
                                </td>
                                <th>
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
                                </th>
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
    );
};

export default Medicine;
