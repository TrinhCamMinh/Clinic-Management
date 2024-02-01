import { FaPlus, FaInfoCircle } from 'react-icons/fa';
import { FaTrashCan } from 'react-icons/fa6';
import { getCurrentDate, formatCurrency } from '../utils/General';
import { useRef, useState, useEffect } from 'react';
import { useDebounce } from '../hooks/index';
import { AgGridReact } from 'ag-grid-react'; //* React Grid Logic

const Receipt = () => {
    const [queryByIllnessName, setQueryByIllnessName] = useState(null);
    const [prescriptionData, setPrescriptionData] = useState(null);

    const [queryUserInfo, setQueryUserInfo] = useState('');
    const [userData, setUserData] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);

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

        if(!diseaseData) return 

        const result = diseaseData.find((item) => {
            return item['Loại bệnh'] === queryByIllnessName;
        });

        if (result) {
            setPrescriptionData(result['Đơn thuốc']);
        } else {
            setPrescriptionData(null);
        }
    };

    const receiveUserData = () => {
        const userData = JSON.parse(sessionStorage.getItem('patientsData'));

        const result = userData.find((item) => {
            return item['SĐT'] === queryUserInfo;
        });

        if (result) {
            setUserData(result);
        } else {
            setUserData('');
        }
    };

    const sumTotalPrice = () => {
        const sumPrice = prescriptionData.reduce((accumulator, currentProduct) => {
            // Add the price of the current product to the accumulator
            return accumulator + currentProduct.price;
        }, 0);

        setTotalPrice(sumPrice);
    };

    useDebounce(receivePrescriptionData, [queryByIllnessName], 1000);
    useDebounce(receiveUserData, [queryUserInfo], 1000);

    //* Column Definitions: Defines & controls grid columns.
    const [colDefs, setColDefs] = useState([
        {
            field: 'name',
            wrapText: true,
            autoHeight: true,
        },
        { field: 'concentration', wrapText: true },
        { field: 'usage', wrapText: true },
        { field: 'price', wrapText: true },
    ]);

    //* Make the AGGrid content automatically resize to fit the grid container size
    const autoSizeStrategy = {
        type: 'fitGridWidth',
        defaultMinWidth: 100,
    };

    useEffect(() => {
        if (!prescriptionData || prescriptionData.length === 0) return;

        sumTotalPrice();
    }, [prescriptionData]);

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

            {/* Only render the divider when prescriptionData have data */}
            {
                prescriptionData && (
                    <section className='mt-4'>
                        <div className='divider divider-primary'></div>
                    </section>
                )
            }

            <section className='w-full'>
                <div className='overflow-x-auto xl:overflow-hidden'>
                    {/* <table className='table table-lg'>
                        <thead>
                            <tr className='text-center'>
                                <th colSpan={6} className='uppercase text-xl italic'>
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
                                <th>Giá</th>
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
                                        <td>{item.price ?? 0}</td>
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
                                            {formatCurrency(totalPrice)} VNĐ
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
                    </table> */}

                    {prescriptionData && (
                        <div className={`col-span-3`} style={{ width: '100%', height: 450 }}>
                            <header>
                                <h2 className='capitalize text-4xl font-bold text-primary text-center'>danh sách đơn thuốc</h2>
                            </header>
                            <div className="ag-theme-quartz-dark mt-8" style={{ height: 500 }}>
                            {/* The AG Grid component */}
                            <AgGridReact 
                                rowData={prescriptionData} 
                                columnDefs={colDefs}  
                                rowSelection={'multiple'}
                                rowGroupPanelShow={'always'}
                                autoSizeStrategy={autoSizeStrategy}
                                pagination={true}
                                paginationPageSize={20}
                                paginationPageSizeSelector={[20, 50, 100]}
                                suppressScrollOnNewData={true} //* tells the grid to NOT scroll to the top when the page changes
                            />
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Receipt;
