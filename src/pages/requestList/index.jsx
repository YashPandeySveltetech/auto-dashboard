import React from 'react'

function RequestList() {
  return (
    <div>

    <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                    DATE OF REQUEST
                    </th>
                    <th scope="col" class="px-6 py-3">
                    NAME OF DIST/ORGN.
                    </th>
                    <th scope="col" class="px-6 py-3">
                    REQUESTED TYPE(CDR, IMEI,TDR,IPDR,CAF)
                    </th>
                    <th scope="col" class="px-6 py-3">
                    TARGET TYPE(MOBILE NO./IP ADDRESS/IMEI/CELL ID)
                    </th>
                    <th scope="col" class="px-6 py-3">
                    DURATION (DATE & TIME)
                    </th>
                    <th scope="col" class="px-6 py-3">
                    ACTION                    </th>
                    <th scope="col" class="px-6 py-3">
                    REMARKS(REASON FOR REJECTION)                </th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Apple MacBook Pro 17"
                    </th>
                    <td class="px-6 py-4">
                        Silver
                    </td>
                    <td class="px-6 py-4">
                        Laptop
                    </td>
                    <td class="px-6 py-4">
                        $2999
                    </td>
                    <td class="px-6 py-4">
                       {/* <button className='bg-green-300'>Approve</button> */}
                       <button className='bg-blue-300'>Click</button>
                       {/* <button className='bg-red-900'>Reject</button> */}
                    </td>
                    <td class="px-6 py-4">
                    <button className='bg-green-300'>Approve</button>
                       <button className='bg-blue-300'>View</button>
                       <button className='bg-red-900'>Reject</button>
                    </td>
                    <td class="px-6 py-4">
                        $2999
                    </td>
                </tr>
          
            </tbody>
        </table>
    </div>
    </div>
  )
}

export default RequestList