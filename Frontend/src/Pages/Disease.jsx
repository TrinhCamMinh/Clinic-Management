import { FaPlus, FaSave } from 'react-icons/fa';
import { GrPowerReset } from 'react-icons/gr';
import { FaEye, FaPencil, FaTrashCan } from 'react-icons/fa6';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../hooks';
import { AgGridReact } from 'ag-grid-react';
import { getCurrentDate, generateRandomID } from '../utils/General';

//* Cell Rendering:Actions column
const Actions = () => {
    return (
        <div className='flex items-center justify-between w-full h-full'>
            <button>
                <FaEye className='w-5 h-5 text-green-400' />
            </button>
            <button>
                <FaPencil className='w-5 h-5 text-yellow-400' />
            </button>
            <button>
                <FaTrashCan className='w-5 h-5 text-red-400' />
            </button>
        </div>
    );
};

const Disease = () => {
    const themeValue = useTheme();
    const generateID = generateRandomID().toUpperCase();
    const [prescriptionRow, setPrescriptionRow] = useState([0]);
    const [prescriptionDataArray, setPrescriptionDataArray] = useState([]);

    //* Data of Prescription Form in a Single Row
    const prescriptionData = {
        name: useRef(null),
        concentration: useRef(null),
        usage: useRef(null),
    };

    //* Big Data Object (Entire Form)
    const data = {
        name: useRef(null),
        description: useRef(null),
        prescription: [],
    };

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
        {
            field: '',
            cellRenderer: Actions,
        },
    ]);

    //* Make the AGGrid content automatically resize to fit the grid container size
    const autoSizeStrategy = {
        type: 'fitGridWidth',
        defaultMinWidth: 100,
    };

    const AppendPrescriptionRow = () => {
        setPrescriptionDataArray((prevData) => [
            ...prevData,
            {
                name: prescriptionData.name.current.value,
                concentration: prescriptionData.concentration.current.value,
                usage: prescriptionData.usage.current.value,
            },
        ]);
        setPrescriptionRow((prevData) => {
            return [...prevData, prevData.at(-1) + 1];
        });
    };

    const submitCreatedData = () => {
        //* Use spread operator since when user done append the last item
        //* They won't click append row function so the latest row data is still not
        //* store in the useState but useRef is holding the lates data value
        data.prescription = [
            ...prescriptionDataArray,
            {
                name: prescriptionData.name.current.value,
                concentration: prescriptionData.concentration.current.value,
                usage: prescriptionData.usage.current.value,
            },
        ];

        setRowData((prevData) => [
            ...prevData,
            {
                'Mã đơn thuốc': data.description.current.value,
                'Loại bệnh': data.name.current.value,
                'Ngày tạo': getCurrentDate(),
                'Đơn thuốc': data.prescription, //* we can store the data that do not rendered
            },
        ]);
    };

    const refreshData = () => {
        data.description.current.value = '';
        data.name.current.value = '';
        data.prescription = [];

        prescriptionData.name.current.value = '';
        prescriptionData.concentration.current.value = '';
        prescriptionData.usage.current.value = '';

        setPrescriptionRow([0]);
    };

    const getPriceOfSingleMedicine = (medicineName) => {
        const medicineData = JSON.parse(sessionStorage.getItem('medicineData'));
        const result = medicineData.find((item) => {
            return item['Tên dược liệu'] === medicineName;
        });

        if (!result) return;

        return result['Giá dược liệu/viên'];
    };

    const mappingPriceForReceipt = () => {
        rowData.forEach((item) => {
            if (!item['Đơn thuốc']) return;

            item['Đơn thuốc'].forEach((singleDT) => {
                singleDT.price = getPriceOfSingleMedicine(singleDT.name) ?? 0;
            });
        });
        console.log(rowData);
    };

    //* Save the data to session storage when user append a new prescription
    //* So that we can use this data in the Receipt Page
    //! Note that: This is only temporary solution (later will use Server)
    useEffect(() => {
        mappingPriceForReceipt();

        const savedDiseaseData = JSON.stringify(rowData);
        sessionStorage.setItem('diseaseData', savedDiseaseData);

        const dialog = document.querySelector('#masterdata_disease_dialog');
        dialog.close();
        refreshData();
    }, [rowData]);

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
                        form thêm mới đơn thuốc - <span className='text-red-400 ml-2 normal-case'>{generateID}</span>
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
                                    ref={data.name}
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
                                    ref={data.description}
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
                                            ĐƠN THUỐC DÙNG
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
                                    {prescriptionRow.map((item, index) => {
                                        return (
                                            <tr key={item}>
                                                <th>{item + 1}</th>
                                                <td>
                                                    <input
                                                        type='text'
                                                        placeholder='Type here'
                                                        className='input input-bordered input-sm w-full max-w-xs'
                                                        ref={prescriptionData.name}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type='text'
                                                        placeholder='Type here'
                                                        className='input input-bordered input-sm w-full max-w-xs'
                                                        ref={prescriptionData.concentration}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type='text'
                                                        placeholder='Type here'
                                                        className='input input-bordered input-sm w-full max-w-xs'
                                                        ref={prescriptionData.usage}
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
                                        );
                                    })}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th colSpan={5} className='text-center'>
                                            <button
                                                className='btn btn-outline btn-success btn-sm btn-wide uppercase'
                                                onClick={AppendPrescriptionRow}
                                            >
                                                Thêm dòng
                                                <FaPlus className='h5 w-5' />
                                            </button>
                                        </th>
                                    </tr>
                                </tfoot>
                            </table>
                        </section>
                    </div>

                    <div className='grid grid-cols-6 mt-8 gap-4 md:gap-8'>
                        <button
                            className='btn btn-error col-span-6 md:col-span-2 order-2 md:order-1 uppercase'
                            onClick={refreshData}
                        >
                            Làm mới dữ liệu
                            <GrPowerReset className='h-5 w-5' />
                        </button>
                        <button
                            className='btn btn-success col-span-6 md:col-span-4 order-1 md:order-2 uppercase'
                            onClick={submitCreatedData}
                        >
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
