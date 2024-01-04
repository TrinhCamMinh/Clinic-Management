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
            <div className='row-start-2'>
                <label className='form-control w-full'>
                    <div className='label'>
                        <span className='label-text'>Loại bệnh</span>
                    </div>
                    <input type='tel' className='input input-bordered w-full' />
                </label>
            </div>
            <div className='row-start-2'>
                <label className='form-control w-full'>
                    <div className='label'>
                        <span className='label-text'>Thành phần dược</span>
                    </div>
                    <input type='text' className='input input-bordered w-full' />
                </label>
            </div>
            <div className='row-start-2'>
                <label className='form-control w-full'>
                    <div className='label'>
                        <span className='label-text'>Giá</span>
                    </div>
                    <input type='number' className='input input-bordered w-full' />
                </label>
            </div>
            <div className='row-start-3'>
                <label className='form-control w-full'>
                    <div className='label'>
                        <span className='label-text'>Hàm lượng</span>
                    </div>
                    <input type='text' className='input input-bordered w-full' />
                </label>
            </div>
            <div className='row-start-3'>
                <label className='form-control w-full'>
                    <div className='label'>
                        <span className='label-text'>Liều</span>
                    </div>
                    <input type='text' className='input input-bordered w-full' />
                </label>
            </div>
            <div className='row-start-3'>
                <label className='form-control w-full'>
                    <div className='label'>
                        <span className='label-text'>Tồn kho</span>
                    </div>
                    <input type='number' className='input input-bordered w-full' />
                </label>
            </div>
            <div className='row-start-4 col-span-3'>
                <div className='overflow-x-auto'>
                    <table className='table'>
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
                            <tr>
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
                                    <button className='btn btn-ghost btn-xs'>details</button>
                                </th>
                            </tr>
                            {/* row 2 */}
                            <tr>
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
                                    <button className='btn btn-ghost btn-xs'>details</button>
                                </th>
                            </tr>
                            {/* row 3 */}
                            <tr>
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
                                    <button className='btn btn-ghost btn-xs'>details</button>
                                </th>
                            </tr>
                            {/* row 4 */}
                            <tr>
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
                                    <button className='btn btn-ghost btn-xs'>details</button>
                                </th>
                            </tr>
                        </tbody>
                        <tfoot>
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
