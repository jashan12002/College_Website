"use client"
import React, { useEffect, useState } from 'react';
import { loggedInUser } from '@/app/teacher-login/page';
import { useRouter } from 'next/navigation';
import AdminNavbar from '@/app/components/AdminNavbar/AdminNavbar';
import { logout } from '@/app/auth';
import { Toaster, toast } from 'react-hot-toast';
import { Client, Databases, ID } from 'appwrite';

const metadata = {
  title: "Teacher Login",
  description: "Generated by create next app",
};

const createData = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if (!loggedInUser) {
      router.push('/teacher-login');
    }
  }, [loggedInUser, router]);

  const handleLogout = async () => {
    await logout();
    router.push('/teacher-login');
  };

  // connecting to database and making the logic
  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65f535a863b003b139f7');
  const databases = new Databases(client);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true); // Set isSubmitting to true before submitting

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const name = e.target.elements.name.value;
    const rollNo = parseInt(e.target.elements.rollNo.value, 10);
    const department = e.target.elements.department.value;
    const attendance = parseInt(e.target.elements.attendance.value, 10);
    const isCR = e.target.elements.isCR.checked
    try {
      const response = await databases.createDocument(
        '65fdab00531d6da4a568',
        '66193b727ebc89771f71',
        ID.unique(),
        {
          name: name,
          roll_no: rollNo,
          department: department,
          attendance:attendance,
          is_CR: isCR
        }
      );

      console.log(response);
      toast.success('Data submitted successfully!', {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#6cc070',
        },
        iconTheme: {
          primary: '#6cc070',
          secondary: '#FFFAEE',
        },
      });
      e.target.reset();
    } catch (error) {
      console.error(error);
      console.error(error);
      toast.error('Error submitting data. Please try again.', {
        style: {
          border: '1px solid #991b1b',
          padding: '16px',
          color: 'red',
        },
        iconTheme: {
          primary: 'red',
          secondary: '#FEE2E2',
        },
      });

    } finally {
      setIsSubmitting(false); // Set isSubmitting to false after submission is complete
    }
  };

  return (
    <div className='md:flex w-full gap-60'>
      <AdminNavbar handleLogout={handleLogout} />
      <Toaster />
      <div className='p-4 w-full'>
        <div className="w-full max-w-md bg-white dark:bg-[#1f2937] rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 dark:text-[#e5e7eb]">Create Student Data</h2>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              required
              className="bg-gray-200 dark:bg-[#374151] text-gray-900 dark:text-[#9ca3af] border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              placeholder="Student Name"
            />
            <input
              type="text"
              name="rollNo"
              required
              className="bg-gray-200 dark:bg-[#374151] text-gray-900 dark:text-[#9ca3af] border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              placeholder="Student Roll no."
            />
            <input
              type="number"
              name="attendance"
              required
              className="bg-gray-200 dark:bg-[#374151] text-gray-900 dark:text-[#9ca3af] border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              placeholder="Total Attendance of student'"
            />
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                name="isCR"
                id="isCR"
                className="mr-2"
              />
              <label htmlFor="isCR" className='dark:text-white'>
                Is the student CR?
              </label>
            </div>
            <select
              name="department"
              required
              id="department"
              className="bg-gray-200 dark:bg-[#374151] text-gray-900 dark:text-[#9ca3af] border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            >
              <option value="">Select Department</option>
              <option value="Commerce">Commerce</option>
              <option value="BA">BA</option>
              <option value="BCA">BCA</option>
              <option value="Bsc">Bsc</option>
            </select>
            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
              disabled={isSubmitting}
            >
             {isSubmitting ? 'Submitting...' : 'Save'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default createData;