CREATE OR REPLACE FUNCTION fixcommence() RETURNS VOID AS $$
    BEGIN
        ALTER TABLE clinic ADD COLUMN _commence INT;
        UPDATE clinic SET _commence = commence;
        ALTER TABLE clinic ADD COLUMN _pregnant BOOLEAN;
        ALTER TABLE clinic ADD COLUMN _breastfeeding BOOLEAN;
        ALTER TABLE clinic DROP COLUMN commence CASCADE;
        ALTER TABLE clinic ADD COLUMN commence BOOLEAN NOT NULL DEFAULT FALSE;
        UPDATE clinic SET commence = (SELECT CASE WHEN _commence = 1 THEN TRUE ELSE FALSE END);
        UPDATE clinic SET _pregnant = (SELECT CASE WHEN pregnant = 1 THEN TRUE WHEN pregnant = 0 THEN FALSE ELSE NULL END);
        UPDATE clinic SET _breastfeeding = (SELECT CASE WHEN breastfeeding = 1 THEN TRUE WHEN breastfeeding = 0 THEN FALSE ELSE NULL END);
        ALTER TABLE clinic DROP COLUMN  _commence CASCADE;
        ALTER TABLE clinic DROP COLUMN  breastfeeding CASCADE;
        ALTER TABLE clinic DROP COLUMN  pregnant CASCADE;
        ALTER TABLE clinic RENAME _pregnant TO pregnant;
        ALTER TABLE clinic RENAME _breastfeeding TO breastfeeding;
    END;
$$
LANGUAGE PLPGSQL;

SELECT fixcommence();

CREATE OR REPLACE FUNCTION fixprescriptionerror() RETURNS VOID AS $$
    BEGIN
        ALTER TABLE pharmacy ADD COLUMN _adr_screened BOOLEAN;
        ALTER TABLE pharmacy ADD COLUMN _adherence BOOLEAN;
        UPDATE pharmacy SET _adr_screened = (SELECT CASE WHEN adr_screened = 'YES' THEN TRUE ELSE FALSE END);
        UPDATE pharmacy SET _adherence = (SELECT CASE WHEN adherence = 1 THEN TRUE ELSE FALSE END);
        ALTER TABLE pharmacy DROP COLUMN adr_screened CASCADE;
        ALTER TABLE pharmacy DROP COLUMN adherence CASCADE;
        ALTER TABLE pharmacy RENAME COLUMN _adr_screened TO adr_screened;
        ALTER TABLE pharmacy RENAME COLUMN _adherence TO adherence;
        ALTER TABLE pharmacy ADD COLUMN prescription_error BOOLEAN NOT NULL DEFAULT FALSE;
        UPDATE pharmacy SET prescription_error = (SELECT CASE WHEN prescrip_error = 1 THEN TRUE ELSE FALSE END);
        ALTER TABLE pharmacy DROP COLUMN prescrip_error CASCADE;
    END;
$$
LANGUAGE PLPGSQL;

SELECT fixprescriptionerror();
