import { useState } from 'react'
import './App.css'
import ModalForm from './components/Modalform'
import NavBar from './components/NavBar'
import TableList from './components/Tablelist'
import axios from 'axios'


function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [searchTerm, setSearchTem] = useState('');
  const [clientData, setClientData] = useState(null);

  const handleOpen = (mode, client) => {
    setClientData(client);
    setModalMode(mode);
    setIsOpen(true);
  };

  const handleSubmit = async (newClientData) => { 
    if(modalMode === 'add') {
       try {
        const response = await axios.post('http://localhost:3002/api/clients/create', newClientData);
        console.log('Client added', response.data);
       } catch (error) {
        console.log("Error adding client:", error);
       }
    } else {
      console.log('modal mode Add');
      console.log('Updating client with ID:', clientData.id);
      try {
          const response = await axios.put(`http://localhost:3002/api/clients/${clientData.id}`, newClientData);
          console.log('Client updated:', response.data)
      } catch (error) {
          console.log('Error updating client', error)
      }

    }
    setIsOpen(false)  
  }

  return (
    <>
      <NavBar onOpen={() => handleOpen('add')} onSearch = {setSearchTem} />
      <TableList handleOpen={handleOpen} searchTerm={searchTerm} />
      <ModalForm 
        isOpen={isOpen} 
        onSubmit={handleSubmit} 
        mode={modalMode} 
        onClose={() => setIsOpen(false)} 
        clientData={clientData}
      />
    </>
  ) 
}

export default App
