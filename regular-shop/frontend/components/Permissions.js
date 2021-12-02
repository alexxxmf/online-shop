import { Query, Mutation } from 'react-apollo';
import Error from './ErrorMessage';
import gql from 'graphql-tag';
import Table from './styles/Table';
import SickButton from './styles/SickButton';

const possiblePermissions = [
    'ADMIN',
    'USER',
    'ITEMCREATE',
    'ITEMUPDATE',
    'ITEMDELETE',
    'PERMISSIONUPDATE'
];

const UPDATE_PERMISSIONS_MUTATION = gql`
  mutation updatePermissions($permissions: [Permission], $userId: ID!) {
    updatePermissions(permissions: $permissions, userId: $userId) {
      id
      permissions
      name
      email
    }
  }
`;

const ALL_USERS_QUERY = gql`
    query {
        users {
            id
            name
            email
            permissions
        }
    }
`;

const Permissions = (props) => (
    <Query query={ALL_USERS_QUERY}>
        {({ data, loading, error }) => (
            <div>
                <Error error={error} />
                <div>
                    <h2>Manage Permissions</h2>
                    <Table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                {possiblePermissions.map(permission =>
                                    <th>{permission}</th> 
                                )}
                                <th>+</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.users.map(user => <UserPermissions key={user.id} user={user} />)}
                        </tbody>
                    </Table>
                </div>
            </div>
        )}
    </Query>
)

class UserPermissions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //exception of using props into state. Seeding ionitial data.
            permissions: this.props.user.permissions 
        }
    }

    handlePermissionChange = (e) => {
        const checkbox = e.target;
        let updatedPermissions = [...this.state.permissions];
        // figure out if we need to add or remove permission
        if(checkbox.checked) {
            updatedPermissions.push(checkbox.value);
        } else {
            updatedPermissions = updatedPermissions.filter((permission) => permission !== checkbox.value)
        }
        this.setState({permissions: updatedPermissions})
    }

    render() {
        const user = this.props.user;
        return (
            <Mutation
                mutation={UPDATE_PERMISSIONS_MUTATION}
                variables={{
                    permissions: this.state.permissions,
                    userId: this.props.user.id
                }}
            >
                {(updatePermissions, { loading, error }) => (
                    <>
                        {error && <Error error={error} />}
                        <tr>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            {possiblePermissions.map(permission => (
                                <td>
                                    <label
                                        htmlFor={`${user.id}-permissions-${permission}`}
                                        key={permission}
                                    >
                                        <input
                                            id={`${user.id}-permissions-${permission}`}
                                            type="checkbox"
                                            checked={this.state.permissions.includes(permission)}
                                            value={permission}
                                            onChange={this.handlePermissionChange}
                                        />
                                    </label>
                                </td>
                            ))}
                            <td>
                                <SickButton
                                    type="button"
                                    disabled={loading}
                                    onClick={updatePermissions}
                                >
                                    Updat{loading ? 'ing' : 'e'}
                                </SickButton>
                            </td>
                        </tr>
                    </>
                )}
            </Mutation>
        )
    }
}

export default Permissions;