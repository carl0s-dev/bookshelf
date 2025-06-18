import { DataTypes } from 'sequelize'
import { sequelize } from 'infra/database'

export const Book = sequelize.define(
  'Book',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    isbn_10: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isbn_13: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    authors: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    thumbnails: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    categories: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    publisher: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publishedAt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
  },
  { tableName: 'books' }
)
