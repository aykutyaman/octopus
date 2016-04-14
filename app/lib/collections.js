// XXX: This file makes fail tests!
import {Mongo} from 'meteor/mongo';

export const Companies = new Mongo.Collection('companies');
export const Vehicles = new Mongo.Collection('vehicles');
export const Tracks = new Mongo.Collection('tracks');
export const Journeys = new Mongo.Collection('journeys');
