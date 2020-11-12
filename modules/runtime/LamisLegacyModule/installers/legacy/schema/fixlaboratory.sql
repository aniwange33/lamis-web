CREATE OR REPLACE FUNCTION fixlaboratory(os INT) RETURNS VOID AS $$
    DECLARE
        rec RECORD;
        rec2 RECORD;
        lab_id BIGINT;
    BEGIN
        FOR rec IN SELECT patient_id, date_result_received, COUNT(*)
            FROM laboratory
            GROUP BY 1, 2 ORDER BY 2 DESC OFFSET os LIMIT 5000
        LOOP
            SELECT id INTO lab_id FROM laboratory WHERE patient_id = rec.patient_id AND date_result_received = rec.date_result_received LIMIT 1;

            FOR rec2 IN SELECT *
            FROM laboratory
            WHERE patient_id = rec.patient_id AND date_result_received = rec.date_result_received order by id
            LOOP
                INSERT INTO laboratory_line (laboratory_id, patient_id, facility_id, archived, result,
                    comment, lab_test_id, uuid, last_modified) VALUES(lab_id, rec2.patient_id, rec2.facility_id,
                    rec2.archived, rec2.resultab, rec2.comment, rec2.lab_test_id, uuid_generate_v4()::text,
                    rec2.last_modified);
            END LOOP;

            UPDATE laboratory SET active = TRUE WHERE id = lab_id;
        END LOOP;

    END;
$$
LANGUAGE PLPGSQL;
