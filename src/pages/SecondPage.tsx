import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../components/DataTable';
import DepartmentList from '../components/DepartmentList';
import { Department } from '../types/types';

const departmentData: Department[] = [
  {
    id: 1,
    name: 'Department 1',
    subDepartments: [
      { id: 2, name: 'Sub Department 1-1' },
      { id: 3, name: 'Sub Department 1-2' },
    ],
  },
  {
    id: 4,
    name: 'Department 2',
    subDepartments: [
      { id: 5, name: 'Sub Department 2-1' },
      { id: 6, name: 'Sub Department 2-2' },
    ],
  },
];

const SecondPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userDetails = localStorage.getItem('userDetails');
    if (!userDetails) {
      navigate('/', { state: { message: 'You must enter your details before accessing this page.' } });
    }
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-[80%] p-8 space-y-8">
      <div className="w-full">
        <h1 className="text-2xl mb-4 flex justify-center font-black">Posts</h1>
        <DataTable />
      </div>
      <div className="w-full">
        <h1 className="text-2xl mb-4">Departments</h1>
        <DepartmentList departments={departmentData} />
      </div>
    </div>
  );
};

export default SecondPage;
