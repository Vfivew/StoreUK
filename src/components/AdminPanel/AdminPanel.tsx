import GoodsManagement from './GoodsManagement/GoodsManagement';
import TypeManagment from './TypeManagment/TypeManagment';
import CategoryManagement from './CategoryManagement/CategoryManagement';

const AdminPanel = () => {
    return (
        <main className='main-admin-panel'>
            <TypeManagment />
            <CategoryManagement/>
            <GoodsManagement/>
        </main>
    );
};

export default AdminPanel;