import { config } from "../config/config";
import {  Client, Databases, Query, ID } from "appwrite";

class DocumentService{
    databases;
    client;

    constructor(){
        this.client = new Client()
            .setEndpoint(config.appWriteUrl)
            .setProject(config.appWriteProjectId);
        
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createDocument({title, slug, content, featuredImage, status, userId}){
        try{
            return await this.databases.createDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug,
                { 
                    'title': title,
                    'content': content,
                    'featuredImage': featuredImage,
                    'status': status,
                    'userId': userId
                }
            );
        } catch (exception) {
            console.log("DocumentService :: createDocument :: exception ", exception);
        }
    }

    async getDocument(slug){
        try{
            const queries = [
                Query.equal('status', 'active')
            ];
            return await this.databases.getDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug,
                queries
            );
        } catch (exception) {
            console.log("DocumentService :: getDocument :: exception ", exception);
        }
    }

    async updateDocument(slug, {title, content, featuredImage, status}){
        try{
            return await this.databases.updateDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug,
                {
                    'title': title,
                    'content': content,
                    'featuredImage': featuredImage, 
                    'status': status
                },
            );
        } catch (exception) {
            console.log("DocumentService :: updateDocument :: exception ", exception);
        }
    }

    async deleteDocument(slug){
        try {
            return await this.databases.deleteDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug
            );  //204 = success
        } catch (exception) {
            console.log("DocumentService :: deleteDocument :: exception ", exception);
        } 
    }

    async getAllDocuments(){
        try{
            const queries = [
                Query.equal('status', 'active')
            ];
            return await this.databases.listDocuments(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                queries
            );
        } catch (exception) {
            console.log("DocumentService :: getAllDocuments :: exception ", exception);
        }
    }
}

const documentService = new DocumentService();
export default documentService;