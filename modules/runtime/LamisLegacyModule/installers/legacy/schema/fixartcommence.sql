CREATE OR REPLACE FUNCTION fixartcommencement() RETURNS VOID AS $$
    DECLARE
        rec RECORD;
        rec2 RECORD;
    BEGIN
        FOR rec IN SELECT patient_id, COUNT(*) as cnt
            FROM clinic
            WHERE commence = 1
            GROUP BY 1
            HAVING COUNT(*) > 1
            ORDER BY 2 desc
        LOOP
            FOR rec2 IN SELECT id, patient_id
            FROM clinic
            WHERE patient_id = rec.patient_id AND commence = 1 AND regimen IS NOT NULL
            ORDER BY date_visit
            OFFSET 1
            LOOP
                DELETE FROM clinic WHERE id = rec2.id;
            END LOOP;
        END LOOP;
    END;
$$
LANGUAGE PLPGSQL;

select fixartcommencement();

CREATE OR REPLACE FUNCTION isint(text) RETURNS BOOLEAN AS $$
    DECLARE x INT;
    BEGIN
        x = $1::INT;
        RETURN TRUE;
    EXCEPTION WHEN others THEN
        RETURN FALSE;
    END;
$$
STRICT
LANGUAGE plpgsql IMMUTABLE;
