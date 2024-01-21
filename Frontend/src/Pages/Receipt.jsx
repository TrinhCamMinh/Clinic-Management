import { FaPlus, FaInfoCircle } from 'react-icons/fa';
import { FaTrashCan } from 'react-icons/fa6';
import { getCurrentDate } from '../utils/General';
import { useRef, useState } from 'react';
import { useDebounce } from '../hooks/index';

const Receipt = () => {
    const [queryByIllnessName, setQueryByIllnessName] = useState(null);
    const [prescriptionData, setPrescriptionData] = useState([]);

    const [queryUserInfo, setQueryUserInfo] = useState('');
    const [userData, setUserData] = useState('');

    const data = {
        phoneNumber: useRef(null),
        comebackDay: useRef(null),
        illnessName: queryByIllnessName, //* tên triệu chứng
    };

    //* When user type illness name
    //* We read the data from SS then load it into UI
    //! Note that: this is only temporary solution (later will use Server)
    const receivePrescriptionData = () => {
        const diseaseData = JSON.parse(sessionStorage.getItem('diseaseData'));

        const result = diseaseData.find((item) => {
            return item['Loại bệnh'] === queryByIllnessName;
        });

        //* [TESTING] console.log(result);

        if (result) {
            setPrescriptionData(result['Đơn thuốc']);
        } else {
            setPrescriptionData([]);
        }
    };

    const receiveUserData = () => {
        const userData = JSON.parse(sessionStorage.getItem('patientsData'));

        const result = userData.find((item) => {
            return item['SĐT'] === queryUserInfo;
        });

        //* [TESTING] console.log(result);

        if (result) {
            setUserData(result);
        } else {
            setUserData('');
        }
    };

    useDebounce(receivePrescriptionData, [queryByIllnessName], 1000);
    useDebounce(receiveUserData, [queryUserInfo], 1000);

    return (
        <div>
            <section className='grid grid-cols-4 gap-4'>
                <label className='form-control col-span-4 xl:col-span-2'>
                    <div className='label'>
                        <span className='label-text'>Tên người khám</span>
                    </div>
                    <input
                        value={userData['Họ và Tên']}
                        type='text'
                        placeholder='VD: Nguyễn Văn A'
                        className='input input-bordered w-full'
                        disabled
                    />
                </label>
                <label className='form-control col-span-4 xl:col-span-2'>
                    <div className='label'>
                        <span className='label-text'>Khách hàng mới</span>
                    </div>
                    <input type='text' placeholder='VD: Có' className='input input-bordered w-full' disabled />
                </label>
                <label className='form-control col-span-4 xl:col-span-1'>
                    <div className='label'>
                        <span className='label-text'>Số điện thoại người khám</span>
                        <div
                            className='tooltip tooltip-info tooltip-left xl:tooltip-top'
                            data-tip='Hệ thống tự động load thông tin bệnh nhân khi nhập đúng số điện thoại người khám'
                        >
                            <FaInfoCircle className='w-4 h-4 text-sky-600 ' />
                        </div>
                    </div>
                    <input
                        type='text'
                        placeholder='Vui lòng nhập SDT người khám'
                        className='input input-bordered w-full'
                        onChange={(e) => setQueryUserInfo(e.target.value)}
                    />
                </label>
                <label className='form-control col-span-4 xl:col-span-1'>
                    <div className='label'>
                        <span className='label-text'>Tuổi người khám</span>
                    </div>
                    <input
                        value={userData['Tuổi']}
                        type='number'
                        placeholder='VD: 8'
                        className='input input-bordered w-full'
                        disabled
                    />
                </label>
                <label className='form-control col-span-4 xl:col-span-1'>
                    <div className='label'>
                        <span className='label-text'>Mã số khám</span>
                    </div>
                    <input type='text' placeholder='VD: 520H0659' className='input input-bordered w-full' disabled />
                </label>
                <label className='form-control col-span-4 xl:col-span-1'>
                    <div className='label'>
                        <span className='label-text'>Mã phiếu khám</span>
                    </div>
                    <input type='text' placeholder='VD: 520H0659' className='input input-bordered w-full' disabled />
                </label>
                <label className='form-control col-span-4 xl:col-span-1'>
                    <div className='label'>
                        <span className='label-text'>Ngày khám</span>
                    </div>
                    <input
                        value={getCurrentDate({}, 'en-CA')}
                        type='date'
                        placeholder='VD: 25/11/2002'
                        className='input input-bordered w-full'
                        disabled
                    />
                </label>
                <label className='form-control col-span-4 xl:col-span-1'>
                    <div className='label'>
                        <span className='label-text'>Ngày tái khám</span>
                    </div>
                    <input
                        type='date'
                        placeholder='vui lòng nhập ngày tái khám'
                        className='input input-bordered w-full'
                        ref={data.comebackDay}
                    />
                </label>
                <label className='form-control col-span-4 xl:col-span-2'>
                    <div className='label'>
                        <span className='label-text'>Tên triệu chứng</span>
                        <div
                            className='tooltip tooltip-info tooltip-left'
                            data-tip='Hệ thống tự động load thông tin đơn thuốc khi nhập đúng tên triệu chứng bệnh'
                        >
                            <FaInfoCircle className='w-4 h-4 text-sky-600 ' />
                        </div>
                    </div>
                    <input
                        type='text'
                        placeholder='Vui lòng nhập tên triệu chứng'
                        className='input input-bordered w-full'
                        onChange={(e) => setQueryByIllnessName(e.target.value)}
                    />
                </label>
                <label className='form-control col-span-4'>
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

            <section className='w-full'>
                <div className='overflow-x-auto'>
                    <table className='table table-lg'>
                        {/* head */}
                        <thead>
                            <tr className='text-center'>
                                <th colSpan={5} className='uppercase text-xl italic'>
                                    <h3 className='font-extrabold text-3xl text-primary text-center uppercase'>
                                        ĐƠN THUỐC DÙNG - MÃ ĐƠN THUỐC{' '}
                                        <span className='text-red-400 ml-2'>520H0659</span>
                                    </h3>
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
                            {prescriptionData?.map((item, index) => {
                                return (
                                    <tr key={item.name}>
                                        <th>{index + 1}</th>
                                        <td>{item.name}</td>
                                        <td>{item.concentration}</td>
                                        <td>{item.usage}</td>
                                        <td></td>
                                    </tr>
                                );
                            })}
                            <tr>
                                <th></th>
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
                </div>
            </section>
        </div>
    );
};

export default Receipt;
