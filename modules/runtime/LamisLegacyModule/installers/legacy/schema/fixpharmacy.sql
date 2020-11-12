CREATE OR REPLACE FUNCTION fixpharmacy(os INT) RETURNS VOID AS $$
    DECLARE
        rec RECORD;
        rec2 RECORD;
        pharmacy_id BIGINT;
    BEGIN
        FOR rec IN SELECT patient_id, date_visit, COUNT(*)
            FROM pharmacy
            GROUP BY 1, 2 ORDER BY 2 DESC OFFSET os LIMIT 20000
        LOOP
            SELECT id INTO pharmacy_id FROM pharmacy WHERE patient_id = rec.patient_id AND date_visit = rec.date_visit LIMIT 1;

            FOR rec2 IN SELECT *
            FROM pharmacy
            WHERE patient_id = rec.patient_id AND date_visit = rec.date_visit
            LOOP
                INSERT INTO pharmacy_line (pharmacy_id, patient_id, facility_id, archived, morning, afternoon, evening,
                    duration, regimen_type_id, regimen_id, regimen_drug_id, uuid, last_modified) VALUES(pharmacy_id,
                    rec2.patient_id, rec2.facility_id, rec2.archived, rec2.morning, rec2.afternoon, rec2.evening,
                    rec2.duration, rec2.regimen_type_id,rec2.regimen_id, rec2.regimen_drug_id, uuid_generate_v4()::text,
                    rec2.last_modified);
            END LOOP;

            UPDATE pharmacy SET active = TRUE WHERE id = pharmacy_id;
        END LOOP;
    END;
$$
LANGUAGE PLPGSQL;
