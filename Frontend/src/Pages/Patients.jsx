import { FaEye, FaPencil, FaTrashCan } from 'react-icons/fa6';

const Patients = () => {
    return (
        <>
            <div className='grid grid-cols-3 gap-4'>
                <div>
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
                <div>
                    <label className='form-control w-full'>
                        <div className='label'>
                            <span className='label-text'>Số điện thoại</span>
                        </div>
                        <input
                            type='tel'
                            placeholder='Vui lòng nhập số điện thoại'
                            className='input input-bordered w-full'
                        />
                    </label>
                </div>
                <div>
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
                <div className='row-start-2'>
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
                <div className='row-start-2'>
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
                <div className='row-start-2'>
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

                <div className='row-start-3 col-start-1 mt-4'>
                    <button className='btn btn-error col-span-1 w-full'>Làm mới dữ liệu</button>
                </div>

                <div className='row-start-3  col-start-2 col-span-2 mt-4'>
                    <button className='btn btn-success w-full'>Tạo mới dữ liệu</button>
                </div>

                <div className='row-start-4 col-span-3'>
                    <div className='divider divider-primary uppercase'>or</div>
                </div>

                {/* Table Section  */}
                <div className='row-start-5 col-span-3'>
                    <input
                        type='text'
                        placeholder='Tìm kiếm'
                        className='input input-bordered input-md w-full max-w-xs mb-4 col-start-3'
                    />
                    <div className='overflow-x-auto'>
                        <table className='table table-zebra'>
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
                                        <span className='badge badge-ghost badge-sm'>
                                            Community Outreach Specialist
                                        </span>
                                    </td>
                                    <td>
                                        <div className='badge badge-accent'>accent</div>
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

export default Patients;
