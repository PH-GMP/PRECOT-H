package com.focusr.Precot.QA.payload;

public enum TabName {

	A("A"),
	BCD("BCD"),
//	DISPOSITION("Disposition"),
//	C("C"),
//	D("D"),
	E("E");

	private final String value;
	
	
	TabName(String value) {
		this.value = value;
	}
	
	public String getValue() {
        return value;
    }
	
	public static TabName fromValue(String value) {
        for (TabName tabName : values()) {
            if (tabName.getValue().equalsIgnoreCase(value)) {
                return tabName;
            }
        }
        throw new IllegalArgumentException("Invalid tab name: " + value);
    }
	
}
