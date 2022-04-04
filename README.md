# DeepTable

Table component with nested rows and aggregations

## How to start the project

1. Install the latest LTS version of Node.js
2. `npm install`
3. `npm run dev`

## Goal

To create a reusable table component

## Component features:

* displaying data from an array of objects of any data structure
* universal preprocessing of incoming props for a component (separated function)
* displaying multiple rows
* show/hide child elements of unlimited nesting
* dynamic aggregation of missing data in rows of upper levels
* editing data in rows with reactive rendering

## Decisions

### Data types

All types are declared in `types/table`.

You can use the `ITable` type to pass `config` props to the `<AppTable />` component

### Incoming structure

1. First, I tried to describe a possible data structure that we can potentially get from the API.
2. It was decided to make a factory function that can accept any raw data as an array of objects (src/utils/)
3. Each of the objects can have a key with an array of nested data. We can pass this key to the factory function for
   data parsing.

### Nesting

I created a flexible logic that allows you to create nesting of unlimited depth. The recursive function "flattenize" is
responsible for this, which "pulls out" from the nested array those objects whose rows are "open".

## Tests

To start tests, run the command:

`npm run test:unit`