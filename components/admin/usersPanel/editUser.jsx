import {
    useGetAllUsersQuery,
    useEditUserMutation,
} from '@/store/services/users'

export default function EditUser() {
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [perms, setPerms] = useState([]);

    const [editUser] = useEditUserMutation();
    const { data: users, isLoading, error } = useGetAllUsersQuery();

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h1>Edit</h1>
        </div>
    )
}