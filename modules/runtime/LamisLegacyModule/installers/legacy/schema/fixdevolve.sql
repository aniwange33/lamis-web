CREATE OR REPLACE FUNCTION get_related_pharmacy(patientId BIGINT, ts DATE) RETURNS INT AS $$
    DECLARE
        rec RECORD;
    BEGIN
        FOR rec IN SELECT id FROM pharmacy WHERE patient_id = patientId AND date_visit < ts ORDER BY date_visit DESC LIMIT 3
        LOOP
            IF(EXISTS(SELECT regimen_type_id FROM pharmacy_line WHERE pharmacy_id = rec.id AND regimen_type_id IN (1, 2, 3, 4, 14)))
                THEN RETURN rec.id;
            END IF;
        END LOOP;
        RETURN NULL;
    END;
$$
LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION get_related_clinic(patientId BIGINT, ts DATE) RETURNS INT AS $$
    DECLARE
        rec RECORD;
    BEGIN
        FOR rec IN SELECT id, clinic_stage FROM clinic WHERE patient_id = patientId AND date_visit < ts ORDER BY date_visit DESC LIMIT 3
        LOOP
            IF(rec.clinic_stage != '' AND rec.clinic_stage IS NOT NULL)
                THEN RETURN rec.id;
            END IF;
        END LOOP;
        RETURN NULL;
    END;
$$
LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION get_related_cd4(patientId BIGINT, ts DATE) RETURNS INT AS $$
    DECLARE
        rec RECORD;
    BEGIN
        FOR rec IN SELECT id FROM laboratory WHERE patient_id = patientId AND date_result_received < ts ORDER BY date_result_received DESC LIMIT 3
        LOOP
            IF(EXISTS(SELECT lab_test_id FROM laboratory_line WHERE laboratory_id = rec.id AND lab_test_id = 1))
                THEN RETURN rec.id;
            END IF;
        END LOOP;
        RETURN NULL;
    END;
$$
LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION get_related_viral_load(patientId BIGINT, ts DATE) RETURNS INT AS $$
    DECLARE
        rec RECORD;
    BEGIN
        FOR rec IN SELECT id FROM laboratory WHERE patient_id = patientId AND date_result_received < ts ORDER BY date_result_received DESC LIMIT 3
        LOOP
            IF(EXISTS(SELECT lab_test_id FROM laboratory_line WHERE laboratory_id = rec.id AND lab_test_id = 16))
                THEN RETURN rec.id;
            END IF;
        END LOOP;
        RETURN NULL;
    END;
$$
LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION fixdevolve() RETURNS VOID AS $$
    BEGIN
        ALTER TABLE devolve ADD COLUMN date_returned_to_facility DATE;
        ALTER TABLE devolve ADD COLUMN related_clinic_id BIGINT;
        ALTER TABLE devolve ADD COLUMN related_pharmacy_id BIGINT;
        ALTER TABLE devolve ADD COLUMN related_viral_load_id BIGINT;
        ALTER TABLE devolve ADD COLUMN related_cd4_id BIGINT;
    END;
$$
LANGUAGE PLPGSQL;

SELECT fixdevolve();

CREATE OR REPLACE FUNCTION setdevolverelated(os INT) RETURNS VOID AS $$
    DECLARE
        rec RECORD;
        rec2 RECORD;
        lab_id BIGINT;
    BEGIN
        FOR rec IN SELECT id
            FROM devolve
            ORDER BY 1 DESC OFFSET os LIMIT 200
        LOOP
            UPDATE devolve SET related_clinic_id = (SELECT get_related_clinic(patient_id, date_devolved)) WHERE id = rec.id;
            UPDATE devolve SET related_pharmacy_id = (SELECT get_related_pharmacy(patient_id, date_devolved)) WHERE id = rec.id;
            UPDATE devolve SET related_cd4_id = (SELECT get_related_cd4(patient_id, date_devolved)) WHERE id = rec.id;
            UPDATE devolve SET related_viral_load_id = (SELECT get_related_viral_load(patient_id, date_devolved)) WHERE id = rec.id;
        END LOOP;
    END;
$$
LANGUAGE PLPGSQL;

