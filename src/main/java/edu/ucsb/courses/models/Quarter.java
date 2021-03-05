package edu.ucsb.courses.models;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * Represents a UCSB quarter. Allows easy conversion between QYY alphanumeric
 * format (F19, W20, S20, M20) and YYYYQ numerical format (20194, 20201, 20202,
 * 20203) as well as incrementing and decrementing.
 *
 */

public class Quarter {

    private int yyyyq; // YYYYQ where Q = 1, 2, 3 or 4

    public Quarter(int yyyyq) {
        setValue(yyyyq);
    }

    public int getValue() {
        return this.yyyyq;
    }

    public void setValue(int yyyyq) {
        if (invalidQtr(yyyyq))
            throw new IllegalArgumentException("Quarter constructor requires a integer ending in 1,2,3 or 4");
        this.yyyyq = yyyyq;
    }

    /**
     * Construct a Quarter object from a string s, either in QYY or YYYYQ format. If
     * s is of length three, QYY format is expected, if 5 then YYYYQ format is
     * expected. Otherwise an IllegalArgumentException is thrown.
     * 
     * @param s Quarter either in QYY or YYYYQ format
     */

    public Quarter(String s) {

        switch (s
                .length()) {
        case 3:
            this.yyyyq = qyyToQyyyy(s);
            return;
        case 5:
            this.yyyyq = yyyyqToInt(s);
            return;
        default:
            throw new IllegalArgumentException("Quarter shoudl be in QYY or YYYYQ format");
        }
    }

    public String getYY() {
        return getYY(this.yyyyq);
    }

    public String getYYYY() {
        return getYYYY(this.yyyyq);
    }

    public String getYYYYQ() {
        return String.format("%d",this.yyyyq);
    }

    public String toString() {
        return yyyyqToQyy(this.yyyyq);
    }

    public String getQ() {
        return getQ(this.yyyyq);
    }

    private static boolean invalidQtr(int value) {
        int index = value % 10;
        return (index < 1) || (index > 4);
    }

    /**
     * Advance to the next quarter, and return the value of that quarter as an int.
     * 
     * @return the new getValue() for the quarter, i.e. quarter as in in yyyyq
     *         format
     */
    public int increment() {
        int q = this.yyyyq % 10;
        int yyyy = this.yyyyq / 10;

        setValue((q == 4) ? (((yyyy + 1) * 10) + 1) : (this.yyyyq + 1));
        return this.yyyyq;
    }

    /**
     * Subtract one from current quarter, and return the value of that quarter as an
     * int.
     * 
     * @return the new getValue() for the quarter, i.e. quarter as in in yyyyq
     *         format
     */
    public int decrement() {
        int q = this.yyyyq % 10;
        int yyyy = this.yyyyq / 10;

        setValue((q == 1) ? (((yyyy - 1) * 10) + 4) : (this.yyyyq - 1));
        return this.yyyyq;
    }

    /**
     * Convert yyyyq as string to int, throwing exception if format is incorrect
     * 
     * @param yyyyq String in yyyyq format (e.g. 20194 for F19 (Fall 2019))
     * @throws IllegalArgumentException
     * @return int representation of quarter
     */
    public static int yyyyqToInt(String yyyyq) {
        String errorMsg = "Argument should be a string representation of a five digit integer yyyyq ending in 1,2,3 or 4";
        int result = 0;
        try {
            result = Integer
                    .parseInt(yyyyq);
        } catch (Exception e) {
            throw new IllegalArgumentException(errorMsg);
        }
        if (invalidQtr(result)) {
            throw new IllegalArgumentException(errorMsg);
        }
        return result;
    }

    /**
     * Convert yyyyq int format to Yqq String format throwing exception if format is
     * incorrect
     * 
     * @param yyyyq int (e.g. 20194 for Fall 2019
     * @throws IllegalArgumentException
     * @return Qyy representation (e.g. F19)
     */
    public static String yyyyqToQyy(int yyyyq) {
        if (invalidQtr(yyyyq)) {
            throw new IllegalArgumentException(
                    "Argument should be a five digit integer in qqqqy format ending in 1,2,3 or 4");
        }
        return String
                .format("%s%s", getQ(yyyyq), getYY(yyyyq));
    }

    /**
     * Take yyyyq int format and return single character for quarter, either "W",
     * "S", "M", or "F" for last digit 1, 2, 3, 4, respectively. Throw illegal
     * argument exception if not in yyyyq format.
     * 
     * @param yyyyq int (e.g. 20194 for Fall 2019)
     * @throws IllegalArgumentException
     * @return single char string for quarter (e.g. "F")
     */
    public static String getQ(int yyyyq) {
        if (invalidQtr(yyyyq)) {
            throw new IllegalArgumentException(
                    "Argument should be a five digit integer in qqqqy format ending in 1,2,3 or 4");
        }
        String[] quarters = new String[] { "W", "S", "M", "F" };
        int index = yyyyq % 10;
        return quarters[index - 1];
    }

    /**
     * Take yyyyq int format and return two digit year as a String Throw illegal
     * argument exception if not in yyyyq format.
     * 
     * @param yyyyq int (e.g. 20194 for Fall 2019)
     * @throws IllegalArgumentException
     * @return two char string for year (e.g. "19")
     */
    public static String getYY(int yyyyq) {
        if (invalidQtr(yyyyq)) {
            throw new IllegalArgumentException(
                    "Argument should be a five digit integer in qqqqy format ending in 1,2,3 or 4");
        }
        return String
                .format("%02d", (yyyyq / 10) % 100);
    }

    /**
     * Take yyyyq int format and return four digit year as a String Throw illegal
     * argument exception if not in yyyyq format.
     * 
     * @param yyyyq int (e.g. 20194 for Fall 2019)
     * @throws IllegalArgumentException
     * @return four char string for year (e.g. "2019")
     */
    public static String getYYYY(int yyyyq) {
        if (invalidQtr(yyyyq)) {
            throw new IllegalArgumentException(
                    "Argument should be a five digit integer in qqqqy format ending in 1,2,3 or 4");
        }
        return String
                .format("%04d", (yyyyq / 10));
    }

    public static int qyyToQyyyy(String qyy) {
        if (qyy
                .length() != 3)
            throw new IllegalArgumentException("Argument shoudl be in QYY format");

        char q = qyy
                .charAt(0);
        String yy = qyy
                .substring(1, 3);
        String legalQuarters = "WSMF";
        int qInt = legalQuarters
                .indexOf(q) + 1;
        if (invalidQtr(qInt)) {
            throw new IllegalArgumentException("First char should be one of " + legalQuarters);
        }
        int yyInt = Integer
                .parseInt(yy);
        int century = (yyInt > 50) ? 1900 : 2000;
        return (century + yyInt) * 10 + qInt;
    }


    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Quarter)) {
            return false;
        }
        Quarter quarter = (Quarter) o;
        return yyyyq == quarter.yyyyq;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(yyyyq);
    }



    /**
     * return a list of Quarters starting with the start parameter and ending with the end parameter, inclusive.
     *
     * The result will automatically go in chronological or reverse chronological order, depending
     * on the order of the parameters.
     * @param start
     * @param end
     * @return list of quarters in specified order
     */

    public static List<Quarter> quarterList(String start, String end) {
        List<Quarter> result = new ArrayList<Quarter>();

        int startInt = Quarter.qyyToQyyyy(start);
        int endInt = Quarter.qyyToQyyyy(end);

        if (startInt <= endInt) {
            for (Quarter iter = new Quarter(startInt); iter.getValue() <= endInt; iter.increment()) {
                Quarter q = new Quarter(iter.getValue());
                result.add(q);
            }
        } else {
            for (Quarter iter = new Quarter(startInt); iter.getValue() >= endInt; iter.decrement()) {
            Quarter q = new Quarter(iter.getValue());
            result.add(q);
            }
        }
        return result;
    }
}
