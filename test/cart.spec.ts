import pactum from 'pactum';
import { StatusCodes } from 'http-status-codes';
import { SimpleReporter } from '../simple-reporter';


describe('Cart - GET', () => {
  const baseUrl = 'https://api.practicesoftwaretesting.com';
  const p = pactum;
  const rep = SimpleReporter;

  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());

  it('Deve retornar um cart', async () => {
    await p
      .spec()
      .get(`${baseUrl}/carts/1`)
      .expectStatus(StatusCodes.OK)
      .expectJsonLike([]);
  });
});

describe('Cart - POST', () => {
    const baseUrl = 'https://api.practicesoftwaretesting.com';
    it('Deve adicionar um item para cart', async () => {
      await pactum
        .spec()
        .post(`${baseUrl}/carts`)
        .withJson({
          product_id: 'HHJC7RERZ0M3VDGS6X9HM11A', 
          quantity: 1
        })
        .expectStatus(StatusCodes.CREATED)
        .expectJsonLike({});
    });
  });

  describe('Cart - POST inválido', () => {
    const baseUrl = 'https://api.practicesoftwaretesting.com';
    it('deve falhar quando campos obrigatórios estiverem faltando', async () => {
      await pactum
        .spec()
        .post(`${baseUrl}/carts`)
        .withJson({})
        .expectStatus(StatusCodes.BAD_REQUEST);
    });
  });

  describe('Cart - POST quantidade negativa', () => {
    const baseUrl = 'https://api.practicesoftwaretesting.com';
    it('deve falhar quando a quantidade for negativa', async () => {
      await pactum
        .spec()
        .post(`${baseUrl}/cart`)
        .withJson({
          product_id: 18,
          quantity: -5
        })
        .expectStatus(StatusCodes.BAD_REQUEST);
    });
  });

  describe('Cart - DELETE', () => {
    let cartItemId: number;
    const baseUrl = 'https://api.practicesoftwaretesting.com';
    beforeAll(async () => {
      const res = await pactum
        .spec()
        .post(`${baseUrl}/cart`)
        .withJson({
          product_id: 'HHJC7RERZ0M3VDGS6X9HM11A',
          quantity: 1
        })
        .expectStatus(StatusCodes.CREATED);

      cartItemId = res.body.id;
    });

    it('deve deletar um item do cart', async () => {
      await pactum
        .spec()
        .delete(`${baseUrl}/cart/${cartItemId}`)
        .expectStatus(StatusCodes.OK);
    });
  });
