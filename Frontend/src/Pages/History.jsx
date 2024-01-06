const History = () => {
    return (
        <>
            <section className='grid grid-cols-4 gap-4 mt-24 lg:mt-0'>
                <label className='form-control w-full col-span-4 xl:col-span-2'>
                    <div className='label'>
                        <span className='label-text'>Số điện thoại người khám</span>
                    </div>
                    <input
                        type='number'
                        placeholder='Vui lòng nhập số điện thoại người khám'
                        className='input input-bordered w-full'
                    />
                </label>
                <label className='form-control w-full col-span-4 xl:col-span-2'>
                    <div className='label'>
                        <span className='label-text'>Mã sổ khám</span>
                    </div>
                    <input type='text' placeholder='VD: 520H0659' className='input input-bordered w-full' disabled />
                </label>
                <label className='form-control w-full col-span-4 xl:col-span-1'>
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
                <label className='form-control w-full col-span-4 xl:col-span-1'>
                    <div className='label'>
                        <span className='label-text'>Tuổi người khám</span>
                    </div>
                    <input type='number' placeholder='VD: 8' className='input input-bordered w-full' disabled />
                </label>
                <label className='form-control w-full col-span-4 xl:col-span-2'>
                    <div className='label'>
                        <span className='label-text'>Địa chỉ người khám</span>
                    </div>
                    <input
                        type='text'
                        placeholder='VD: Bình Phú, TP.HCM'
                        className='input input-bordered w-full'
                        disabled
                    />
                </label>
            </section>

            <section className='mt-4'>
                <div className='divider divider-primary uppercase'>or</div>
            </section>

            <section>
                <div className='overflow-x-auto'>
                    <table className='table table-zebra table-lg'>
                        {/* head */}
                        <thead>
                            <tr>
                                <th colSpan={5} className='text-center text-xl italic uppercase'>
                                    lịch sử khám
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
                        </tbody>
                        {/* foot */}
                        <tfoot>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Job</th>
                                <th>Favorite Color</th>
                                <th></th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </section>
        </>
    );
};

export default History;
