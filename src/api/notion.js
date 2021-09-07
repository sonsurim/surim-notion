import { request } from './config/index.js';

const getDocuments = async id => {
	const url = id ? `/${id}` : '';
	return await request(url, { method: 'GET' });
};

const createDocument = async document => {
	return await request('', {
		method: 'POST',
		body: JSON.stringify(document),
	});
};

const updateDocument = async (id, document) => {
	return await request(`/${id}`, {
		method: 'PUT',
		body: JSON.stringify(document),
	});
};

const deleteDocument = async id => {
	return await request(`/${id}`, {
		method: 'DELETE',
	});
};

export { getDocuments, createDocument, updateDocument, deleteDocument };
