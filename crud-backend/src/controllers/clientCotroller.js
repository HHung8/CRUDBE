import { query } from 'express';
import * as clientService from '../services/clientServices.js';

export const getClients = async(req,res) => {
    console.log(req)
    try {
        const clients = await clientService.getClients();
        res.status(200).json(clients);
    } catch (error) {
        console.error("Error fetching clients", error);
        res.status(500).json({message: 'Internal Server'})
    }
}

export const createClient = async(req,res) => {
    console.log(req)
    try {
        const clientData = req.body;
        const newClient = await clientService.createClients(clientData);
        res.status(200).json(newClient);
    } catch (error) {
        console.error("Error adding clients", error);
        res.status(500).json({message: "Internal Server"})
    }
}

export const updatedClients = async(req,res) => {
    try {
        const clientId = req.params.id;
        const clientData = req.body;
        const updatedClient = await clientService.updateClients(clientData, clientId);
        if(!updatedClient) {
            return res.status(404).json({message: 'Client not found'})
        }
        res.status(200).json(updatedClient);
    } catch (error) {
        console.error("Error updating client", error);
        res.status(500).json({message: "Internal Server"})
    }
};

export const deleteClients = async (req, res) => {
    try {
        const clientId = req.params.id;
        const deleted = await clientService.deleteClients(clientId);
        
        if (!deleted) {
            return res.status(404).json({ message: 'Client not found' });
        }
        
        return res.status(200).send();
    } catch (error) {
        console.error("Error deleting client:", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const searchClients = async(req,res) => {
    try {
        const searchTerm = req.query.q;
        const clients = await clientService.searchClients(searchTerm);
        res.status(200).json(clients);
    } catch (error) {
        console.log('Error searching clients', error);
        res.status(500).json({message: 'Internal Server Error'});
    }
}
