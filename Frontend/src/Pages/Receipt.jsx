import { FaPlus } from 'react-icons/fa';
import { FaTrashCan } from 'react-icons/fa6';

const Receipt = () => {
    return (
        <div>
            <section className='grid grid-cols-4 gap-4'>
                <label className='form-control w-full col-span-4 xl:col-span-2'>
                    <div className='label'>
                        <span className='label-text'>Tên người khám</span>
                    </div>
                    <input
                        type='text'
                        placeholder='VD: Nguyễn Văn A'
                        className='input input-bordered w-full'
                        disabled
                    />
                </label>
                <label className='form-control w-full col-span-4 xl:col-span-2'>
                    <div className='label'>
                        <span className='label-text'>Khách hàng mới</span>
                    </div>
                    <input type='text' placeholder='VD: Có' className='input input-bordered w-full' disabled />
                </label>
                <label className='form-control w-full col-span-4 xl:col-span-1'>
                    <div className='label'>
                        <span className='label-text'>Số điện thoại người khám</span>
                    </div>
                    <input
                        type='text'
                        placeholder='Vui lòng nhập SDT người khám'
                        className='input input-bordered w-full'
                    />
                </label>
                <label className='form-control w-full col-span-4 xl:col-span-1'>
                    <div className='label'>
                        <span className='label-text'>Tuổi người khám</span>
                    </div>
                    <input type='number' placeholder='VD: 8' className='input input-bordered w-full' disabled />
                </label>
                <label className='form-control w-full col-span-4 xl:col-span-1'>
                    <div className='label'>
                        <span className='label-text'>Mã số khám</span>
                    </div>
                    <input type='text' placeholder='VD: 520H0659' className='input input-bordered w-full' disabled />
                </label>
                <label className='form-control w-full col-span-4 xl:col-span-1'>
                    <div className='label'>
                        <span className='label-text'>Mã phiếu khám</span>
                    </div>
                    <input type='text' placeholder='VD: 520H0659' className='input input-bordered w-full' disabled />
                </label>
                <label className='form-control w-full col-span-4 xl:col-span-1'>
                    <div className='label'>
                        <span className='label-text'>Ngày khám</span>
                    </div>
                    <input type='date' placeholder='VD: 25/11/2002' className='input input-bordered w-full' disabled />
                </label>
                <label className='form-control w-full col-span-4 xl:col-span-1'>
                    <div className='label'>
                        <span className='label-text'>Ngày tái khám</span>
                    </div>
                    <input
                        type='date'
                        placeholder='vui lòng nhập ngày tái khám'
                        className='input input-bordered w-full'
                    />
                </label>
                <label className='form-control w-full col-span-4 xl:col-span-2'>
                    <div className='label'>
                        <span className='label-text'>Tên triệu chứng</span>
                    </div>
                    <input
                        type='text'
                        placeholder='Vui lòng nhập tên triệu chứng'
                        className='input input-bordered w-full'
                    />
                </label>
                <label className='form-control w-full col-span-4'>
                    <div className='label'>
                        <span className='label-text'>Mô tả triệu chứng</span>
                    </div>
                    <input
                        type='text'
                        placeholder='VD: mệt mỏi, uể oải'
                        className='input input-bordered w-full'
                        disabled
                    />
                </label>
            </section>

            <section className='mt-4'>
                <div className='divider divider-primary'>OR</div>
            </section>

            <section>
                <table className='table table-lg'>
                    {/* head */}
                    <thead>
                        <tr className='text-center'>
                            <th colSpan={5} className='uppercase text-xl italic'>
                                ĐƠN THUỐC DÙNG - MÃ ĐƠN THUỐC <span className='text-red-400 ml-2'>520H0659</span>
                            </th>
                        </tr>
                        <tr>
                            <th></th>
                            <th>Tên thuốc</th>
                            <th>Hàm lượng</th>
                            <th>Liều dùng</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        <tr>
                            <th>1</th>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Blue</td>
                            <td></td>
                        </tr>
                        {/* row 2 */}
                        <tr>
                            <th>2</th>
                            <td>Hart Hagerty</td>
                            <td>Desktop Support Technician</td>
                            <td>Purple</td>
                            <td></td>
                        </tr>
                        {/* row 3 */}
                        <tr>
                            <th>3</th>
                            <td>Brice Swyre</td>
                            <td>Tax Accountant</td>
                            <td>Red</td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>4</th>
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
                            <th colSpan={5} className='text-right'>
                                <p className='text-xl'>
                                    Tổng:{' '}
                                    <span className='text-green-600 font-extrabold italic underline underline-offset-4 decoration-2 decoration-sky-500'>
                                        5.000.000 VNĐ
                                    </span>
                                </p>
                            </th>
                        </tr>
                        <tr>
                            <th colSpan={5} className='text-center'>
                                <div
                                    className='tooltip tooltip-info'
                                    data-tip='Dữ liệu bổ sung sẽ không lưu vào hệ thống.'
                                >
                                    <button className='btn btn-outline btn-success btn-sm btn-wide uppercase'>
                                        Bổ sung đơn thuốc
                                        <FaPlus className='h5 w-5' />
                                    </button>
                                </div>
                            </th>
                        </tr>
                    </tfoot>
                </table>
            </section>
        </div>
    );
};

export default Receipt;
