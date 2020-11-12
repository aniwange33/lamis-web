CREATE OR REPLACE FUNCTION fixpk() RETURNS VOID AS $$
    BEGIN
        IF NOT EXISTS (SELECT constraint_name FROM information_schema.table_constraints WHERE lower(table_name) = 'lga' AND constraint_type = 'PRIMARY KEY') THEN
            ALTER TABLE lga ADD PRIMARY KEY (id);
        END IF;
        IF NOT EXISTS (SELECT constraint_name FROM information_schema.table_constraints WHERE lower(table_name) = 'state' AND constraint_type = 'PRIMARY KEY') THEN
            ALTER TABLE state ADD PRIMARY KEY (id);
        END IF;
        IF NOT EXISTS (SELECT constraint_name FROM information_schema.table_constraints WHERE lower(table_name) = 'facility' AND constraint_type = 'PRIMARY KEY') THEN
            ALTER TABLE facility ADD PRIMARY KEY (id);
        END IF;
        IF NOT EXISTS (SELECT constraint_name FROM information_schema.table_constraints WHERE lower(table_name) = 'clinic' AND constraint_type = 'PRIMARY KEY') THEN
            ALTER TABLE clinic ADD PRIMARY KEY (id);
        END IF;
        IF NOT EXISTS (SELECT constraint_name FROM information_schema.table_constraints WHERE lower(table_name) = 'patient' AND constraint_type = 'PRIMARY KEY') THEN
            ALTER TABLE patient ADD PRIMARY KEY (id);
        END IF;
        IF NOT EXISTS (SELECT constraint_name FROM information_schema.table_constraints WHERE lower(table_name) = 'adhere' AND constraint_type = 'PRIMARY KEY') THEN
            ALTER TABLE adhere ADD PRIMARY KEY (id);
        END IF;
        IF NOT EXISTS (SELECT constraint_name FROM information_schema.table_constraints WHERE lower(table_name) = 'adverse_drug_reaction' AND constraint_type = 'PRIMARY KEY') THEN
            ALTER TABLE adverse_drug_reaction ADD PRIMARY KEY (id);
        END IF;
        IF NOT EXISTS (SELECT constraint_name FROM information_schema.table_constraints WHERE lower(table_name) = 'opportunistic_infection' AND constraint_type = 'PRIMARY KEY') THEN
            ALTER TABLE opportunistic_infection ADD PRIMARY KEY (id);
        END IF;
        IF NOT EXISTS (SELECT constraint_name FROM information_schema.table_constraints WHERE lower(table_name) = 'regimen' AND constraint_type = 'PRIMARY KEY') THEN
            ALTER TABLE regimen ADD PRIMARY KEY (id);
        END IF;
        IF NOT EXISTS (SELECT constraint_name FROM information_schema.table_constraints WHERE lower(table_name) = 'regimen_type' AND constraint_type = 'PRIMARY KEY') THEN
            ALTER TABLE regimen_type ADD PRIMARY KEY (id);
        END IF;
        IF NOT EXISTS (SELECT constraint_name FROM information_schema.table_constraints WHERE lower(table_name) = 'dm_screen' AND constraint_type = 'PRIMARY KEY') THEN
            ALTER TABLE dm_screen ADD PRIMARY KEY (id);
        END IF;
        IF NOT EXISTS (SELECT constraint_name FROM information_schema.table_constraints WHERE lower(table_name) = 'tb_screen' AND constraint_type = 'PRIMARY KEY') THEN
            ALTER TABLE tb_screen ADD PRIMARY KEY (id);
        END IF;
        IF NOT EXISTS (SELECT constraint_name FROM information_schema.table_constraints WHERE lower(table_name) = 'facility' AND constraint_type = 'PRIMARY KEY') THEN
            ALTER TABLE facility ADD PRIMARY KEY (id);
        END IF;
    END;
$$
LANGUAGE PLPGSQL;

SELECT fixpk();
