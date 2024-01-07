import Swal from 'sweetalert2';

export const Alert = ({ ...configs }) => {
    Swal.fire({
        position: 'top-right',
        timerProgressBar: true,
        timer: 3000,
        ...configs,
    });
};
