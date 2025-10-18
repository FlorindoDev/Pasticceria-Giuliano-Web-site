
import { beforeEach, expect, jest, test } from '@jest/globals';

jest.unstable_mockModule('../models/DataBase.js', () => ({
    Prodotto: jest.fn(),
}));

const { ProductController } = await import('../controllers/ProductController.js');
const { Prodotto } = await import('../models/DataBase.js');

beforeEach(() => {
    Prodotto.mockReset();
});

test('addProduct ritorna il risultato del mock di save', async () => {

    const fakeSave = jest.fn().mockResolvedValue({ id: 123, nome: 'pane', costo: 2.5, image: 'img.png', tag: "cio" });


    Prodotto.mockImplementation(() => ({ save: fakeSave }));

    const body = { id: 123, nome: 'pane', costo: 2.5, image: 'img.png', tag: "cio" };

    const result = await ProductController.addProduct(body);
    expect(result).toEqual({ id: 123, nome: 'pane', costo: 2.5, image: 'img.png', tag: "cio" });
    expect(Prodotto).toHaveBeenCalledTimes(1);
    expect(fakeSave).toHaveBeenCalledTimes(1);
});
