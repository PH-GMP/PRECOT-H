package com.focusr.Precot.mssql.database.model.padpunching.audit;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.util.AppConstants;

@Entity
@Table(name = "PRODUCTION_DETAIL_LOG_BOOK_LINES_HISTORY_F01",schema=AppConstants.schema)
public class ProductionDetailLogBookLinesHistory01 {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
	private Long id;
	
	@Column(name = "MACHINE_NAME")
	private String machine_name;

	@Column(name = "MAN_POWER_ALLOCATION")
	private String man_power_allocation;

	@Column(name = "RUNNING_PRODUCT_NAME")
	private String running_product_name;

	@Column(name = "NEXT_PRODUCT_NAME")
	private String next_product_name;

	@Column(name = "RUNNING_ORDER_NO")
	private String running_order_no;

	@Column(name = "NEXT_ORDER_NO")
	private String next_order_no;

	@Column(name = "RUNNING_PO_NUMBER")
	private String running_po_number;

	@Column(name = "NEXT_PO_NUMBER")
	private String next_po_number;

	@Column(name = "RUNNING_OPENING_QTY")
	private Long running_opening_qty;

	@Column(name = "NEXT_OPENING_QTY")
	private Long next_opening_qty;

	@Column(name = "RUNNING_PACKED_QTY")
	private Long running_packed_qty;

	@Column(name = "NEXT_PACKED_QTY")
	private Long next_packed_qty;

	@Column(name = "RUNNING_BALANCR_QTY")
	private Long running_balancr_qty;

	@Column(name = "NEXT_BALANCE_QTY")
	private Long next_balance_qty;

	@Column(name = "RUNNING_STATUS")
	private String running_status;

	@Column(name = "NEXT_STATUS")
	private String next_status;
	
	@Column(name = "HISTORY_ID")
	private Long history_id;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getMachine_name() {
		return machine_name;
	}

	public void setMachine_name(String machine_name) {
		this.machine_name = machine_name;
	}

	public String getMan_power_allocation() {
		return man_power_allocation;
	}

	public void setMan_power_allocation(String man_power_allocation) {
		this.man_power_allocation = man_power_allocation;
	}

	public String getRunning_product_name() {
		return running_product_name;
	}

	public void setRunning_product_name(String running_product_name) {
		this.running_product_name = running_product_name;
	}

	public String getNext_product_name() {
		return next_product_name;
	}

	public void setNext_product_name(String next_product_name) {
		this.next_product_name = next_product_name;
	}

	public String getRunning_order_no() {
		return running_order_no;
	}

	public void setRunning_order_no(String running_order_no) {
		this.running_order_no = running_order_no;
	}

	public String getNext_order_no() {
		return next_order_no;
	}

	public void setNext_order_no(String next_order_no) {
		this.next_order_no = next_order_no;
	}

	public String getRunning_po_number() {
		return running_po_number;
	}

	public void setRunning_po_number(String running_po_number) {
		this.running_po_number = running_po_number;
	}

	public String getNext_po_number() {
		return next_po_number;
	}

	public void setNext_po_number(String next_po_number) {
		this.next_po_number = next_po_number;
	}

	public Long getRunning_opening_qty() {
		return running_opening_qty;
	}

	public void setRunning_opening_qty(Long running_opening_qty) {
		this.running_opening_qty = running_opening_qty;
	}

	public Long getNext_opening_qty() {
		return next_opening_qty;
	}

	public void setNext_opening_qty(Long next_opening_qty) {
		this.next_opening_qty = next_opening_qty;
	}

	public Long getRunning_packed_qty() {
		return running_packed_qty;
	}

	public void setRunning_packed_qty(Long running_packed_qty) {
		this.running_packed_qty = running_packed_qty;
	}

	public Long getNext_packed_qty() {
		return next_packed_qty;
	}

	public void setNext_packed_qty(Long next_packed_qty) {
		this.next_packed_qty = next_packed_qty;
	}

	public Long getRunning_balancr_qty() {
		return running_balancr_qty;
	}

	public void setRunning_balancr_qty(Long running_balancr_qty) {
		this.running_balancr_qty = running_balancr_qty;
	}

	public Long getNext_balance_qty() {
		return next_balance_qty;
	}

	public void setNext_balance_qty(Long next_balance_qty) {
		this.next_balance_qty = next_balance_qty;
	}

	public String getRunning_status() {
		return running_status;
	}

	public void setRunning_status(String running_status) {
		this.running_status = running_status;
	}

	public String getNext_status() {
		return next_status;
	}

	public void setNext_status(String next_status) {
		this.next_status = next_status;
	}

	public Long getHistory_id() {
		return history_id;
	}

	public void setHistory_id(Long history_id) {
		this.history_id = history_id;
	}

}
