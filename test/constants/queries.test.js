import { expect } from 'chai';
import { validate } from 'graphql/validation';
import { parse } from 'graphql/language';
import { buildClientSchema } from 'graphql/utilities';
import * as queries from '../../app/src/constants/queries';
import * as mutations from '../../app/src/constants/mutations';
import data from './helpers/schema.json';
const clientSchema = buildClientSchema(data.data);

function expectValid (schema, queryString) {
  const errors = validate(schema, parse(queryString));
  expect(errors).to.deep.equal([]);
}

describe('GraphQL constants', (done) => {
  describe('queries', (done) => {
    const queryKeys = Object.keys(queries);
    queryKeys.forEach((key) => {
      const query = queries[key];
      // if (query === queries) return;
      it('validates query against GraphQL schema', (done) => {
        expectValid(clientSchema, query);
        done();
      });
    });
  });
  describe('mutations', (done) => {
    const mutationKeys = Object.keys(mutations);
    mutationKeys.forEach((key) => {
      const mutation = mutations[key];
      // if (query === queries) return;
      it('validates mutation against GraphQL schema', (done) => {
        expectValid(clientSchema, mutation);
        done();
      });
    });
  });
});
