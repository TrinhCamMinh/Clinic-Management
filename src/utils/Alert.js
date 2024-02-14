import Swal from 'sweetalert2';

export const Alert = ({ ...configs }) => {
    Swal.fire({
        position: 'top-right',
        timerProgressBar: true,
        timer: 3000,
        ...configs,
    });
};

export const AlertNew = {
    Confirm: async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        });
        return result.isConfirmed;
    },
};
