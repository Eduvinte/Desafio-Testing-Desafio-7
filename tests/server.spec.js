const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    it("Obteniendo un 200", async () => {
        const response = await request(server).get("/cafes").send()
        const status = response.statusCode

        expect(status).toBe(200)
    })
    it("Vetificando el tipo de datos y si existe al menos un object", async () => {
        const { body } = await request(server).get("/cafes").send()
        const productos = body

        expect(productos).toBeInstanceOf(Object) // Verifica el type
        
        expect(Array.isArray(productos)).toBe(true); // Verifica si es un arreglo
        expect(productos.length).toBeGreaterThan(0); // Verifica si el arreglo tiene al menos un elemento
        expect(typeof productos[0]).toBe('object'); // Verifica si el primer elemento del arreglo es un objeto
    })
});


describe("Delete café", () => {
    it("Eliminando café con id que no existe, esperando un error 404", async () => {
        const id = 999
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlMTFAZ21haWwuY29tIiwiaWF0IjoxNjg3MjcxNTI5fQ.vIU4kO5Aip_NjvSc0ZXJ2mJ4cFzONG5LF_nuQgYaacY"
        const response = await request(server)
        .delete(`/cafes/${id}`)
        .set("Authorization", `Bearer ${token}`)
        .send()
        expect(response.status).toBe(404)
    })

    describe("Probando código 201 agregando café", () => {
        it("Agregando café y retornando código 201", async () => {
            const nuevoCafe = {
                id: 6,
                nombre: "Café Vainilla"
            }          

            const response = await request(server)
            .post("/cafes")
            .send(nuevoCafe)

            expect(response.status).toBe(201)
        })
    })

    describe("Probando código 400 al intentar actualizar café con ID incorrecto", () => {
        it("Actualizando café con ID incorrecto y retornando código 400", async () => {
          const idParam = 1;
          const idPayload = 2;
          const cafeActualizado = {
            id: idPayload,
            nombre: "Café Actualizado",
          };
      
          const response = await request(server)
            .put(`/cafes/${idParam}`)
            .send(cafeActualizado);
      
          expect(response.status).toBe(400);
        });
      });

})

