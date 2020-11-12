CREATE OR REPLACE FUNCTION unscramblecharacters(val VARCHAR) RETURNS VARCHAR AS $$
    BEGIN
        val = replace(val, '^', 'a');
        val = replace(val, '~', 'b');
        val = replace(val, '`', 'c');
        val = replace(val, '*', 'e');
        val = replace(val, '$', 'f');
        val = replace(val, '#', 'g');
        val = replace(val, '@', 'h');
        val = replace(val, '!', 'i');
        val = replace(val, '%', 'j');
        val = replace(val, '|', 'k');
        val = replace(val, '}', 'n');
        val = replace(val, '{', 'o');
        return val;
    END;
$$
LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION unscramblenumbers(val VARCHAR) RETURNS VARCHAR AS $$
    BEGIN 
        val = replace(val, '^', '1');
        val = replace(val, '~', '2');
        val = replace(val, '`', '3');
        val = replace(val, '*', '5');
        val = replace(val, '$', '6');
        val = replace(val, '#', '7');
        val = replace(val, '@', '8');
        val = replace(val, '!', '9');
        RETURN val;
    END;
$$
LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION titlecase(instr varchar) RETURNS varchar AS $$
DECLARE
    strarray varchar[] := string_to_array(inStr, ' ');
    outstrarray varchar[];
    word varchar;
    BEGIN
        FOREACH word IN ARRAY strarray
            LOOP
                outstrarray := array_append(outstrarray, (upper(left(word,1))::varchar ||
                                                      lower(right(word,-1))::varchar)::varchar);
            END LOOP;
        RETURN array_to_string(outstrarray,' ','');
END;
$$
LANGUAGE PLPGSQL;
