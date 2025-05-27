package com.focusr.Precot.mssql.database.model;


import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.focusr.Precot.model.audit.DateAudit;
import com.focusr.Precot.mssql.database.model.bleaching.Department;
import com.focusr.Precot.util.AppConstants;


/**
 * Created by FocusR.
 */

@Entity
@Table(name = "USER_LOGIN_DETAILS", schema=AppConstants.schema, uniqueConstraints = {
        @UniqueConstraint(columnNames = {
            "username"
        }),
        @UniqueConstraint(columnNames = {
            "email"
        })
})
public class User  extends DateAudit{
    @Id
//    @SequenceGenerator(name = "USER_LOGIN_DETAILS_SEQ", sequenceName = "USER_LOGIN_DETAILS_SEQ", allocationSize = 1)
//	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "USER_LOGIN_DETAILS_SEQ")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 250)
    private String name;

    @NotBlank
    @Size(max = 50)
    private String username;
    
    @NotBlank
    @Size(max = 100)
    @Email
    private String email;

    @NotBlank
    @Size(max = 500)
    private String password;
    
    
    @Column(name="DEPARTMENT_ID")
    private Long departmentId;
    
    private char is_active;
    
    @Column(name = "reset_token" , length = 2000)
	private String resetToken;
    
    @Column(name="passwordAt")
    private Date passwordAt;
    
	public String getResetToken() {
		return resetToken;
	}

	public void setResetToken(String resetToken) {
		this.resetToken = resetToken;
	}


	@ManyToMany(cascade =CascadeType.ALL)
    @JoinTable(name = "ROLES_MAP_BY_USERS",schema=AppConstants.schema,
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

	
	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "DEPARTMENT_MAP_BY_USERS", schema = AppConstants.schema, joinColumns = @JoinColumn(name = "user_id"), 
			inverseJoinColumns = @JoinColumn(name = "dept_id"))
	private Set<Department> departments = new HashSet<Department>();
	
     
//	@Column(name = "PASSWORD_HISTORY")
//	private List<String> passwordHistory;
	
//	@OneToMany(mappedBy = "passwordAudit", cascade = CascadeType.ALL, orphanRemoval = true)
//	private List<PasswordHistory> passwordHistory; 
	
    
    public User(String name, String username, String email, String password ,
    		         char is_active,Long departmentId) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
		this.is_active = is_active;
		this.departmentId = departmentId;
    }


   
	public User(Long id, @NotBlank @Size(max = 40) String name, @NotBlank @Size(max = 15) String username,
			@NotBlank @Size(max = 40) @Email String email, @NotBlank @Size(max = 100) String password, String orgname,
			String vendorID, String agentId, char supplier_flag, char buyer_flag, Set<Role> roles , char is_active,Long departmentId) {
		this.id = id;
		this.name = name;
		this.username = username;
		this.email = email;
		this.password = password;
		this.roles = roles;
		this.is_active = is_active;
		this.departmentId = departmentId;
	}

	public User(@NotBlank @Size(max = 250) String name, @NotBlank @Size(max = 50) String username,
			@NotBlank @Size(max = 100) @Email String email, @NotBlank @Size(max = 500) String password,
			char is_active) {
		super();
		this.name = name;
		this.username = username;
		this.email = email;
		this.password = password;
		this.is_active = is_active;
	}

	public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
    
    public char getIs_Active() {
		return is_active;
	}

	public void setIs_Active(char is_active) {
		this.is_active = is_active;
	}

	public Date getPasswordAt() {
		return passwordAt;
	}

	public void setPasswordAt(Date passwordAt) {
		this.passwordAt = passwordAt;
	}
	
	public Long getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(Long departmentId) {
		this.departmentId = departmentId;
	}

	public char getIs_active() {
		return is_active;
	}

	public void setIs_active(char is_active) {
		this.is_active = is_active;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", name=" + name + ", username=" + username + ", email=" + email + ", password="
				+ password + ", is_active=" + is_active + ", resetToken=" + resetToken + ", roles=" + roles + " ,department =" +departmentId+"]";
	}

	public User() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Set<Department> getDepartments() {
		return departments;
	}

	public void setDepartments(Set<Department> departments) {
		this.departments = departments;
	}

	
	
	
}

