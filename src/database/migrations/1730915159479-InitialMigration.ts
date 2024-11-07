import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class InitialMigration1730915159479 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create `flight` table
        await queryRunner.createTable(
            new Table({
                name: 'flight',
                columns: [
                    {
                        name: 'flightId',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'flightNumber',
                        type: 'varchar',
                        length: '255',
                    },
                    {
                        name: 'departureTime',
                        type: 'datetime',
                    },
                    {
                        name: 'arrivalTime',
                        type: 'datetime',
                    },
                    {
                        name: 'price',
                        type: 'decimal',
                        precision: 10,
                        scale: 2,
                    },
                ],
            }),
            true
        );

        // Create `passenger` table
        await queryRunner.createTable(
            new Table({
                name: 'passenger',
                columns: [
                    {
                        name: 'passengerId',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'firstName',
                        type: 'varchar',
                        length: '255',
                    },
                    {
                        name: 'lastName',
                        type: 'varchar',
                        length: '255',
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        length: '255',
                        isUnique: true,
                    },
                    {
                        name: 'phone',
                        type: 'varchar',
                        length: '255',
                    },
                ],
            }),
            true
        );

        // Create `booking` table with foreign keys to `flight` and `passenger`
        await queryRunner.createTable(
            new Table({
                name: 'booking',
                columns: [
                    {
                        name: 'bookingId',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'seatNumber',
                        type: 'varchar',
                        length: '50',
                    },
                    {
                        name: 'bookingDate',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'status',
                        type: 'enum',
                        enum: ['booked', 'cancelled', 'completed'],
                        default: `'booked'`,
                    },
                    {
                        name: 'flightId',
                        type: 'int',
                    },
                    {
                        name: 'passengerId',
                        type: 'int',
                    },
                ],
            }),
            true
        );

        // Add foreign keys
        await queryRunner.createForeignKey(
            'booking',
            new TableForeignKey({
                columnNames: ['flightId'],
                referencedColumnNames: ['flightId'],
                referencedTableName: 'flight',
                onDelete: 'CASCADE',
            })
        );

        await queryRunner.createForeignKey(
            'booking',
            new TableForeignKey({
                columnNames: ['passengerId'],
                referencedColumnNames: ['passengerId'],
                referencedTableName: 'passenger',
                onDelete: 'CASCADE',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop `booking` table
        const bookingTable = await queryRunner.getTable('booking');
        if (bookingTable) {
            const foreignKeys = bookingTable.foreignKeys.filter(fk => fk.columnNames.indexOf('flightId') !== -1 || fk.columnNames.indexOf('passengerId') !== -1);
            await queryRunner.dropForeignKeys('booking', foreignKeys);
        }

        await queryRunner.dropTable('booking');
        await queryRunner.dropTable('passenger');
        await queryRunner.dropTable('flight');
    }
}
