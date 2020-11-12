CREATE OR REPLACE FUNCTION fix_dead_ltfu() RETURNS VOID AS $$
    DECLARE
        rec RECORD;
        rec2 RECORD;
    BEGIN
        FOR rec IN SELECT patient_id, date_status
            FROM status_history
            WHERE auto = true
        LOOP
            FOR rec2 IN SELECT date_status
            FROM status_history
            WHERE patient_id = rec.patient_id AND status = 'KNOWN_DEATH' AND date_status < rec.date_status
            LOOP
                DELETE FROM status_history WHERE patient_id = rec.patient_id AND date_status > rec2.date_status;
            END LOOP;
        END LOOP;
    END;
$$
LANGUAGE PLPGSQL;

SELECT fix_dead_ltfu();
