import server from '../../src/server';

const chai = require('chai');
const expect = chai.expect;
import * as app_request from 'supertest';

describe('Test Containers', () => {

    function getContainers(filters: object = {}): Promise<any> {
        return app_request(server)
            .get(`/api/containers/`)
            .query(filters);
    }

    function createContainer(data: {name: string, tag: string}): Promise<any> {
        return app_request(server)
            .post(`/api/containers/`)
            .send(data);
    }

    function startContainer(containerId: string): Promise<any> {
        return app_request(server)
            .patch(`/api/containers/${containerId}`)
            .send({ status: 'start' });
    }

    function stopContainer(containerId: string): Promise<any> {
        return app_request(server)
            .patch(`/api/containers/${containerId}`)
            .send({ status: 'stop' });
    }

    function deleteContainer(containerId: string): Promise<any> {
        return app_request(server)
            .delete(`/api/containers/${containerId}`);
    }
    
    
    describe('/POST api/containers. Create, start, stop, delete', () => {
        let containerResponse: any;
        it('should create a container', async() => {

            containerResponse = await createContainer({ name: 'nginx', tag: 'myNginx_' + Math.random() });
            expect(containerResponse.status).to.equal(201);
            expect(containerResponse.body).to.have.property('name', 'nginx');

        });

        it('should start a container', async() => {
            containerResponse = await startContainer(containerResponse.body.id);
            expect(containerResponse.status).to.equal(201);
            expect(containerResponse.body.state.running).to.be.a('boolean', true);
        });


        it('should have ONE running container in the list', async() => {
            const containerResponse = await getContainers();
            expect(containerResponse.status).to.equal(200);
            expect(containerResponse.body).to.have.lengthOf(1);
        });

        it('should stop a container', async() => {
            containerResponse = await stopContainer(containerResponse.body.id);
            expect(containerResponse.status).to.equal(201);
            expect(containerResponse.body).to.have.property('name', 'nginx');
        });

        it('should have NONE running container in the list', async() => {
            const containerResponse = await getContainers();
            expect(containerResponse.status).to.equal(200);
            expect(containerResponse.body).to.have.lengthOf(0);
        });

        it('should delete a container', async() => {
            containerResponse = await deleteContainer(containerResponse.body.id);
            expect(containerResponse.status).to.equal(203);
        });
        
    });
});
