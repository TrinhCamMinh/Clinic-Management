import { FaEye, FaPencil, FaTrashCan } from 'react-icons/fa6';
import { GrPowerReset } from 'react-icons/gr';
import { FaSave } from 'react-icons/fa';

import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../hooks';
import { AgGridReact } from 'ag-grid-react'; //* React Grid Logic
import { db } from '../Configs/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { Alert } from '../utils/Alert';

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

const Medicine = () => {
    const themeValue = useTheme();
    const data = {
        name: useRef(null), //* tên thuốc
        symptom: useRef(null), //* triệu chứng bệnh
        ingredient: useRef(null), //* thành phần dược
        cost: useRef(null), //* giá
        concentration: useRef(null), //* hàm lượng
        usage: useRef(null), //* liều thuốc
        existNumber: useRef(null), //* số lượng tồn kho
    };

    const checkboxSelection = function (params) {
        //* we put checkbox on the name if we are not doing grouping
        return params.api.getRowGroupColumns().length === 0;
    };

    const headerCheckboxSelection = function (params) {
        //* we put checkbox on the name if we are not doing grouping
        return params.api.getRowGroupColumns().length === 0;
    };

    //* Row Data: The data to be displayed in Table.
    const [rowData, setRowData] = useState([]);

    //* Column Definitions: Defines & controls grid columns.
    const [colDefs, setColDefs] = useState([
        {
            headerName: 'Tên dược liệu',
            field: 'name',
            wrapText: true,
            autoHeight: true,
            pinned: 'left',
            filter: true,
            checkboxSelection: checkboxSelection,
            headerCheckboxSelection: headerCheckboxSelection,
        },
        { headerName: 'Triệu chứng bệnh', field: 'symptom', wrapText: true, filter: true },
        { headerName: 'Thành phần dược', field: 'ingredient', wrapText: true, filter: true },
        { headerName: 'Hàm lượng', field: 'concentration', wrapText: true, filter: true },
        { headerName: 'Liều lượng', field: 'usage', wrapText: true, filter: true },
        { headerName: 'Số lượng tồn kho', field: 'existNumber', filter: true },
        { headerName: 'Giá dược liệu/viên', field: 'cost', filter: true },
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

    const refreshData = () => {
        data.name.current.value = null;
        data.symptom.current.value = null;
        data.ingredient.current.value = null;
        data.concentration.current.value = null;
        data.usage.current.value = null;
        data.existNumber.current.value = null;
        data.cost.current.value = null;
    };

    //* Get Medicine List from Firebase Server (FireStore - Medicines Collection)
    const getMedicineList = async () => {
        const querySnapshot = await getDocs(collection(db, 'Medicines'));
        querySnapshot.forEach((doc) => {
            const medicine = doc.data();
            setRowData((prevData) => [
                ...prevData,
                {
                    name: medicine.name,
                    symptom: medicine.symptom,
                    ingredient: medicine.ingredient,
                    concentration: medicine.concentration,
                    usage: medicine.usage,
                    existNumber: medicine.existNumber,
                    cost: medicine.cost,
                },
            ]);
        });
    };

    const submitCreatedData = async () => {
        try {
            const docRef = await addDoc(collection(db, 'Medicines'), {
                name: data.name.current.value,
                symptom: data.symptom.current.value,
                ingredient: data.ingredient.current.value,
                concentration: data.concentration.current.value,
                usage: data.usage.current.value,
                existNumber: Number(data.existNumber.current.value),
                cost: Number(data.cost.current.value),
            });
            console.log('Document written with ID: ', docRef.id);
            Alert({ toast: true, icon: 'success', text: 'Thêm mới dữ liệu thành công' });

            setRowData((prevRowData) => {
                return [
                    ...prevRowData,
                    {
                        name: data.name.current.value,
                        symptom: data.symptom.current.value,
                        ingredient: data.ingredient.current.value,
                        concentration: data.concentration.current.value,
                        usage: data.usage.current.value,
                        existNumber: Number(data.existNumber.current.value),
                        cost: Number(data.cost.current.value),
                    },
                ];
            });
        } catch (e) {
            Alert({ icon: 'error', title: 'Oops...', text: e.message });
        }
    };

    useEffect(() => {
        //* Close modal after save data successfully
        //* And clear the data
        const dialog = document.querySelector('#masterdata_medicine_dialog');
        dialog.close();
        refreshData();

        //* Save the data to session storage
        //* So we can import the price automatically in Disease Page
        //! Note that: This is only temporary solution (later use Server)
        const savedMedicineData = JSON.stringify(rowData);
        sessionStorage.setItem('medicineData', savedMedicineData);

        //* If we leave empty dependency useEffect will only run once in the initial render
        //* By passing the second argument an empty array,
        //* React will compare after each render the array and will see nothing was changed,
        //* thus calling the callback only after the first render.
    }, [rowData]);

    //* Get Medicine List when component first mounted
    useEffect(() => {
        getMedicineList();
    }, []);

    return (
        <div className='grid grid-cols-3 gap-4 md:gap-0'>
            <section className='col-span-3 mt-4'>
                <button
                    className='btn btn-success w-full'
                    onClick={() => document.getElementById('masterdata_medicine_dialog').showModal()}
                >
                    Tạo mới dữ liệu
                </button>
            </section>

            <section className='col-span-3'>
                <div className='divider divider-primary uppercase'></div>
            </section>

            {/* Table Section  */}
            <section className='col-span-3'>
                {/* Container with theme & dimensions */}
                <div
                    className={`col-span-3 ${themeValue === 'light' ? 'ag-theme-quartz' : 'ag-theme-quartz-dark'}`}
                    style={{ width: '100%', height: 450 }}
                >
                    <h3 className='font-extrabold text-3xl text-primary text-center uppercase mb-4'>
                        danh sách dược liệu
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
            <dialog id='masterdata_medicine_dialog' className='modal'>
                <div className='modal-box w-11/12 max-w-5xl'>
                    <form method='dialog'>
                        {/* if there is a button in form, it will close the modal */}
                        <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>✕</button>
                    </form>

                    <h3 className='font-bold text-2xl text-center mb-4 uppercase text-primary'>
                        form thêm mới dược liệu
                    </h3>

                    {/* MasterData Input */}
                    <div className='grid grid-cols-2 gap-3'>
                        <div className='col-span-2'>
                            <label className='form-control w-full'>
                                <div className='label'>
                                    <span className='label-text'>Tên thuốc</span>
                                </div>
                                <input
                                    type='text'
                                    placeholder='Vui lòng nhập tên thuốc'
                                    className='input input-bordered w-full'
                                    ref={data.name}
                                />
                            </label>
                        </div>
                        <label className='form-control w-full col-span-2 xl:col-span-1'>
                            <div className='label'>
                                <span className='label-text'>triệu chứng bệnh</span>
                            </div>
                            <input
                                type='tel'
                                placeholder='Vui lòng nhập triệu chứng bệnh'
                                className='input input-bordered w-full'
                                ref={data.symptom}
                            />
                        </label>
                        <label className='form-control w-full col-span-2 xl:col-span-1'>
                            <div className='label'>
                                <span className='label-text'>Thành phần dược</span>
                            </div>
                            <input
                                type='text'
                                placeholder='Vui lòng nhập thành phần dược'
                                className='input input-bordered w-full'
                                ref={data.ingredient}
                            />
                        </label>
                        <label className='form-control w-full col-span-2 xl:col-span-1'>
                            <div className='label'>
                                <span className='label-text'>Giá</span>
                            </div>
                            <input
                                type='number'
                                placeholder='Vui lòng nhập giá'
                                className='input input-bordered w-full'
                                ref={data.cost}
                            />
                        </label>
                        <label className='form-control w-full col-span-2 xl:col-span-1'>
                            <div className='label'>
                                <span className='label-text'>Hàm lượng</span>
                            </div>
                            <input
                                type='text'
                                placeholder='Vui lòng nhập hàm lượng'
                                className='input input-bordered w-full'
                                ref={data.concentration}
                            />
                        </label>
                        <label className='form-control w-full col-span-2 xl:col-span-1'>
                            <div className='label'>
                                <span className='label-text'>Liều Thuốc</span>
                            </div>
                            <input
                                type='text'
                                placeholder='Vui lòng nhập liều thuốc'
                                className='input input-bordered w-full'
                                ref={data.usage}
                            />
                        </label>
                        <label className='form-control w-full col-span-2 xl:col-span-1'>
                            <div className='label'>
                                <span className='label-text'>Số lượng Tồn kho</span>
                            </div>
                            <input
                                type='number'
                                placeholder='Vui lòng nhập số lượng tồn kho'
                                className='input input-bordered w-full'
                                ref={data.existNumber}
                            />
                        </label>
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

export default Medicine;
