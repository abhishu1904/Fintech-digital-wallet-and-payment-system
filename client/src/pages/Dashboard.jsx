import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/**
 * Dashboard Component
 * Main landing page showing wallet overview and recent transactions
 */
const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const wallet = useSelector(state => state.wallet);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.first_name}!
            </h1>
            <p className="text-gray-600 mt-2">Here's what's happening with your wallet</p>
          </div>

          {/* Wallet Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-500 text-sm font-medium">Wallet Balance</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                ${wallet?.balance?.toFixed(2) || '0.00'}
              </p>
              <p className="text-gray-500 text-xs mt-2">{wallet?.currency || 'USD'}</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-500 text-sm font-medium">Total Transactions</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {wallet?.transaction_count || 0}
              </p>
              <p className="text-gray-500 text-xs mt-2">This month</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-500 text-sm font-medium">Security Status</p>
              <p className="text-green-600 font-bold mt-2">
                {user?.two_fa_enabled ? '✓ 2FA Enabled' : '⚠ 2FA Disabled'}
              </p>
              <p className="text-gray-500 text-xs mt-2">Account security</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
                Send Money
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg">
                Add Money
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg">
                View Analytics
              </button>
              <button className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg">
                Settings
              </button>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Transactions</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {/* Sample transaction rows */}
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Transfer</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      -$100.00
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                        Completed
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Today
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
