import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const GroupOrderContext = createContext();

export const GroupOrderProvider = ({ children }) => {
  const [currentGroup, setCurrentGroup] = useState(null);

  const createGroup = async (userId) => {
    const res = await axios.post('http://localhost:5000/api/group-orders', { userId });
    return res.data.groupId;
  };

  const joinGroup = async (groupId, userId) => {
    const res = await axios.post(`http://localhost:5000/api/group-orders/${groupId}/join`, { userId });
    setCurrentGroup(res.data);
  };

  return (
    <GroupOrderContext.Provider value={{ currentGroup, createGroup, joinGroup }}>
      {children}
    </GroupOrderContext.Provider>
  );
};

export const useGroupOrder = () => useContext(GroupOrderContext);