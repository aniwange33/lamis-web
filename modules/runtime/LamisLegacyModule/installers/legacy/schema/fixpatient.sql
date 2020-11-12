CREATE OR REPLACE FUNCTION fixpatient() RETURNS VOID AS $$
    BEGIN
        ALTER TABLE patient ADD COLUMN _pregnant BOOLEAN;
        ALTER TABLE patient ADD COLUMN _breastfeeding BOOLEAN;
        ALTER TABLE patient ADD COLUMN _send_message BOOLEAN;
        UPDATE patient SET _breastfeeding = (SELECT CASE WHEN breastfeeding = 1 THEN TRUE WHEN breastfeeding = 0 THEN FALSE ELSE NULL END);
        UPDATE patient SET _pregnant = (SELECT CASE WHEN pregnant = 1 THEN TRUE WHEN pregnant = 0 THEN FALSE ELSE NULL END);
        UPDATE patient SET _send_message = (SELECT CASE WHEN send_message = 1 THEN TRUE ELSE FALSE END);
        UPDATE patient SET gender = (SELECT CASE WHEN LOWER(TRIM(gender)) = 'male' THEN 'MALE' WHEN LOWER(TRIM(gender)) = 'female' THEN 'FEMALE' ELSE NULL END);
        ALTER TABLE patient DROP COLUMN breastfeeding CASCADE;
        ALTER TABLE patient DROP COLUMN pregnant CASCADE;
        ALTER TABLE patient DROP COLUMN send_message CASCADE;
        ALTER TABLE patient DROP COLUMN age CASCADE;
        ALTER TABLE patient DROP COLUMN age_unit CASCADE;
        ALTER TABLE patient RENAME _breastfeeding TO breastfeeding;
        ALTER TABLE patient RENAME _pregnant TO pregnant;
        ALTER TABLE patient RENAME _send_message TO send_message;
        UPDATE case_manager SET sex = (SELECT CASE WHEN LOWER(TRIM(sex)) = 'male' THEN 'MALE' WHEN LOWER(TRIM(sex)) = 'female' THEN 'FEMALE' ELSE NULL END);
        UPDATE patient_case_manager SET action = (SELECT CASE WHEN LOWER(TRIM(action)) = 'assignment' THEN 'ASSIGNMENT'
            WHEN LOWER(TRIM(action)) = 'deassignment' THEN 'DE_ASSIGNMENT' WHEN LOWER(TRIM(action)) = 'reassignment' THEN 'RE_ASSIGNMENT' ELSE NULL END);
        UPDATE patient SET case_manager_id = NULL WHERE case_manager_id IN (SELECT id FROM case_manager WHERE fullname IS NULL OR fullname = '');
        DELETE FROM case_manager WHERE fullname IS NULL OR fullname = '';
        UPDATE case_manager SET fullname = titlecase(fullname);
        ALTER TABLE patient ALTER COLUMN address TYPE CHARACTER VARYING (300);
        ALTER TABLE patient ALTER COLUMN next_of_kin_address TYPE CHARACTER VARYING (300);
        ALTER TABLE case_manager ALTER COLUMN address TYPE CHARACTER VARYING (300);
        UPDATE case_manager SET address = titlecase(REGEXP_REPLACE(replace(coalesce(unscramblecharacters(address), ''), ',', ', '), '\s+', ' '));
        UPDATE patient SET address = titlecase(REGEXP_REPLACE(replace(coalesce(unscramblecharacters(address), ''), ',', ', '), '\s+', ' '));
        UPDATE patient SET next_of_kin_address = titlecase(REGEXP_REPLACE(replace(coalesce(unscramblecharacters(next_of_kin_address), ''), ',', ', '), '\s+', ' '));
        UPDATE patient SET enrollment_setting = NULL WHERE enrollment_setting = '';
        ALTER TABLE community_pharmacy RENAME COLUMN pharmacy TO name;

        UPDATE patient SET
                           surname = titlecase(coalesce(unscramblecharacters(surname),'')),
                           other_names = titlecase(coalesce(unscramblecharacters(other_names), '')),
                           address = coalesce(unscramblecharacters(address), ''),
                           next_of_kin = titlecase(coalesce(unscramblecharacters(next_of_kin),'')),
                           next_of_kin_address = coalesce(unscramblecharacters(next_of_kin_address), ''),
                           phone = coalesce(unscramblenumbers(phone), ''),
                           next_of_kin_phone = coalesce(unscramblenumbers(next_of_kin_phone), '');
    END;
$$
LANGUAGE PLPGSQL;

SELECT fixpatient();
